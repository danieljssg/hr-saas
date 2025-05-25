export const dynamic = "force-dynamic";
import { SearchRegExp } from "@/utils/SearchRegExp";
import { NextResponse } from "next/server";
import { ExtractJobDescription } from "@/utils/ai";
import dbConnect from "@/config/mongodb";
import Job from "@/models/Job";

export const GET = async (req) => {
  try {
    await dbConnect();
    const jobs = await Job.find({ deleted: false });
    if (!jobs || jobs?.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No se encontraron cargos",
          data: [],
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      { success: true, data: jobs, message: "Cargos encontrados" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
        data: [],
      },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await dbConnect();

    const body = await req.json();
    const { jobName, file, jobCode } = body;
    const jobNameRegex = SearchRegExp(jobName);

    const existingJob = await Job.findOne({ name: { $regex: jobNameRegex } });
    if (existingJob) {
      return NextResponse.json(
        {
          success: false,
          message: "El cargo ya existe",
        },
        {
          status: 400,
        }
      );
    }

    const jobAI = await ExtractJobDescription(file);

    if (jobAI && jobAI?.name && jobAI?.description) {
      const newJob = new Job({
        name: jobName,
        description: jobAI.description,
        code: jobCode,
        level: 0,
        filepath: file,
      });

      await newJob.save();
      return NextResponse.json(
        {
          success: true,
          message: "Cargo creado correctamente",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "No se pudo extraer la descripción del cargo, inténtelo de nuevo",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};

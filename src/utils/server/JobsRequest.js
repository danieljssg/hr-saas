import { cookies } from "next/headers";

export const createJob = async (formData) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.API_URL}/upload`, {
      method: "POST",
      headers: {
        Cookie: `authToken=${cookieStore.get("authToken")?.value}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        message: data.message,
        resume: data.resume,
        success: true,
      };
    } else {
      return {
        message: data.message,
        resume: null,
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message,
      resume: null,
      success: false,
    };
  }
};

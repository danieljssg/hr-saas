import { cookies } from "next/headers";

export const createJob = async (formData) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.API_URL}/jobs`, {
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
        success: true,
      };
    } else {
      return {
        message: data.message,
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

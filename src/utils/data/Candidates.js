import { cookies } from "next/headers";

export const getCandidates = async () => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${process.env.API_URL}/analysis`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authToken=${cookieStore.get("authToken")?.value}`,
      },

      next: {
        revalidate: 1,
      },
    });

    if (response.ok) {
      const analysis = await response.json();
      return analysis.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

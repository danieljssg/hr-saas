export const getCandidates = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/analysis`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

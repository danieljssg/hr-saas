export const getJobs = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: {
        revalidate: 1,
      },
    });

    if (response.ok) {
      const jobs = await response.json();
      return jobs.data;
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

import fs from "fs/promises";

export const saveOnJSON = async (newdata) => {
  try {
    const savedata = await fs.readFile("data.json", "utf-8");
    const data = JSON.parse(savedata || "[]", null, 2);

    data.push(newdata);

    await fs.writeFile("data.json", JSON.stringify(data));

    return true;
  } catch (error) {
    console.log(error);

    return error;
  }
};

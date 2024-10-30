const API_URL = "http://localhost:8081/api/file";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/uploadFile`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer o upload do arquivo");
  }

  return response.json();
};

export const downloadSummaryFile = async (fileName) => {
  try {
    const response = await fetch(
      `${API_URL}/downloadSummary?fileName=${fileName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao baixar o arquivo");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    link.remove();
  } catch (error) {
    console.log("Erro ao fazer o download do arquivo.", error);
    throw error;
  }
};

export const downloadFile = async (fileName) => {
  try {
    const response = await fetch(
      `${API_URL}/downloadFile/${fileName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao baixar o arquivo");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    link.remove();
  } catch (error) {
    console.log("Erro ao fazer o download do arquivo.", error);
    throw error;
  }
};

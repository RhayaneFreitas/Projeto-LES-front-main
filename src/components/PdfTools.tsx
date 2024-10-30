"use client";

import React, { useState } from "react";
import styles from "../styles/PdfTools.module.css"; // Importando o CSS Module
import { downloadFile, downloadSummaryFile } from "@/utils/api";
import { useFile } from "@/components/FileContext";

const PdfTools: React.FC = () => {
  const [generateSummary, setGenerateSummary] = useState(false);
  const [translateText, setTranslateText] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { fileName } = useFile();

  const handleDownload = () => {
    if (fileName) {
      if (generateSummary) {
        downloadSummaryFile(fileName);
      } else {
        downloadFile(fileName);
      }
    } else {
      alert("Nenhum arquivo disponível para download");
    }
  };
  const handleConfirm = () => {
    console.log({
      generateSummary,
      translateText,
      selectedLanguage,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Ferramentas para o seu PDF</h1>

      <div className={styles.pdfOptionsSection}>
        <div className={styles.pdfGroup}>
          <div className={styles.pdfIcon}>{/* Ícone do PDF */}</div>

          <div className={styles.tools}>
            <label>
              <input
                type="checkbox"
                checked={generateSummary}
                onChange={() => {
                  setGenerateSummary(!generateSummary);
                }}
              />
              <strong>Gerar resumo</strong>
            </label>
          </div>
        </div>

        <div className={styles.optionsGroup}>
          <div className={styles.dropdown}>
            <select
              className={styles.selectDropdown}
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">Selecione uma linguagem</option>
              <option value="en">Inglês</option>
              <option value="es">Espanhol</option>
              <option value="fr">Francês</option>
              <option value="de">Alemão</option>
              <option value="pt-br">Português (Brasil)</option>
            </select>
          </div>

          <div className={styles.tools}>
            <label>
              <input
                type="checkbox"
                checked={translateText}
                onChange={() => setTranslateText(!translateText)}
              />
              <strong>Traduzir texto</strong>
            </label>
          </div>
        </div>
      </div>

      <button className={styles.confirmButton} onClick={handleDownload}>
        Baixar arquivo
      </button>
    </div>
  );
};

export default PdfTools;

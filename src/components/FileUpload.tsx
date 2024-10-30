"use client";

import React, { useState, useRef } from 'react';
import styles from '../styles/FileUpload.module.css';
import { uploadFile } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useFile } from '@/components/FileContext';

const FileUpload: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<string | null>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const router = useRouter();
  const { setFileName } = useFile();

  const preventDefaults = (e: React.DragEvent | React.ChangeEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleNavigation = () => {
    router.push('/tools');
  };

  const handleDragEnter = () => {
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add(styles.highlight);
    }
  };

  const handleDragLeave = () => {
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove(styles.highlight);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    preventDefaults(e);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type === "application/pdf") {
      setFileInfo("Arquivo PDF carregado"); // Mensagem fixa
      setFileName(file.name);
      uploadFileToServer(file);
    } else {
      setFileInfo("Por favor, selecione um arquivo PDF.");
    }
  };

  const uploadFileToServer = async (file: File) => {
    try {
      setUploadStatus("Fazendo upload do arquivo");
      const response = await uploadFile(file);
      setUploadStatus(`Upload concluído. Arquivo disponível em: ${response.fileDownloadUri}`);
    } catch (error) {
      setUploadStatus(`Erro ao fazer o upload do arquivo: ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.headerTitle}>
        Selecione seu arquivo PDF <span>📄</span>
      </h2>
      <div
        id={styles['drop-area']}
        ref={dropAreaRef}
        className={styles.dropArea}
        onDragEnter={handleDragEnter}
        onDragOver={preventDefaults}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.pdfIcon}></div>
        <p className={styles.paragraph}>Arraste e solte um arquivo PDF aqui</p>
        <input
          type="file"
          id="fileElem"
          accept="application/pdf"
          onChange={(e) => handleFiles(e.target.files!)}
          className={styles.fileInput}
        />
        <div className={styles.buttonContainer}>
          <label className={styles.button} htmlFor="fileElem">
            Selecionar arquivo
          </label>
          {uploadStatus && (
            <button onClick={handleNavigation} className={styles.button}>
              Enviar
            </button>
          )}
        </div>
      </div>
      <div id="file-info">{fileInfo && <p>{fileInfo}</p>}</div>
    </div>
  );
};

export default FileUpload;


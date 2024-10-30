import FileUpload from '../components/FileUpload'

export const metadata = {
  title: 'Leitor de PDF',
  description: 'Bem-vindo à página inicial do meu site.',
};

export default function Home() {
  return (
    <>
      <FileUpload/>
    </>
  );
}

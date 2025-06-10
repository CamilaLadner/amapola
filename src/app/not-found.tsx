import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Pagina no encontrada</h1>
        <p className="mb-8">Lo siento, la página que buscas no existe.</p>
        <Link href="/" className="text-blue-500 hover:underline">
            Volver al inicio
        </Link>
        </div>
    );
    }
    
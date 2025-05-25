import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileText, Clock, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold  mb-4">
        Portal de Captación de Talento
      </h1>
      <p className="text-xl  mb-8">
        Únete a nuestro equipo y forma parte de una empresa innovadora
      </p>
      <Link href="/postulacion">
        <Button size="lg" className="px-8 py-3 text-lg">
          Iniciar Postulación
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader className="text-center">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <CardTitle>Formulario Inteligente</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Proceso de postulación dividido en pasos simples y organizados
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Clock className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <CardTitle>Guarda tu Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Tu información se guarda automáticamente, puedes continuar después
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <CardTitle>Múltiples Opciones</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Postúlate al departamento que mejor se adapte a tu perfil
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-red-600 mx-auto mb-2" />
            <CardTitle>Información Segura</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Tus datos están protegidos y se manejan con total confidencialidad
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold  mb-4">
        ¿Listo para comenzar tu carrera con nosotros?
      </h2>
      <p className=" mb-6">
        El proceso toma aproximadamente 10 minutos y puedes guardar tu progreso
        en cualquier momento
      </p>
      <Link href="/postulacion">
        <Button variant="outline" size="lg">
          Comenzar Ahora
        </Button>
      </Link>
    </div>
  );
}

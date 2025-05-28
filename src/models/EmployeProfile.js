import { Schema, model, models } from "mongoose";

// --- ESQUEMAS DE SUB-DOCUMENTOS REUTILIZABLES ---

// Sub-esquema para documentos genéricos. Reutilizable para todas las secciones que listan documentos.
const documentItemSchema = new Schema(
  {
    name: {
      type: String, // Nombre del documento (ej. "Copia de Cédula de Identidad", "Constancia de Trabajo")
      required: true,
    },
    filePath: {
      type: String, // Ruta al archivo escaneado del documento en el almacenamiento (ej. S3 URL, ruta local)
      required: true,
    },
    uploadDate: {
      type: Date, // Fecha de subida del documento a la base de datos/sistema
      default: Date.now,
    },
    description: {
      type: String, // Descripción o notas adicionales sobre el documento
      default: null,
    },
    expirationDate: {
      type: Date, // Fecha de vencimiento del documento, si aplica (ej. licencia de conducir, carnet de salud)
      default: null,
    },
    deleted: {
      type: Boolean, // Indicador para "soft-delete" del documento si ya no es relevante o fue reemplazado
      default: false,
    },
  },
  { _id: false } // No crear un _id automático para cada subdocumento si no se necesita identificar individualmente
);

// Esquema para la información de contacto de emergencia
const emergencyContactSchema = new Schema(
  {
    name: {
      type: String, // Nombre completo del contacto de emergencia
      required: true,
    },
    relationship: {
      type: String, // Parentesco con el empleado (ej. "Madre", "Padre", "Cónyuge", "Hermano", "Amigo")
      required: true,
    },
    phone: {
      type: String, // Número de teléfono del contacto de emergencia
      required: true,
    },
    email: {
      type: String, // Correo electrónico del contacto de emergencia (opcional)
      default: null,
    },
  },
  { _id: false }
);

// Esquema para las referencias personales y laborales
const referenceSchema = new Schema({
  name: {
    type: String, // Nombre completo de la persona de referencia
    required: true,
  },
  phone: {
    type: String, // Número de teléfono de la referencia
    required: true,
  },
  email: {
    type: String, // Correo electrónico de la referencia (opcional)
    default: null,
  },
  relationship: {
    type: String, // Relación con el empleado (ej. "Personal", "Antiguo Jefe", "Colega", "Amigo")
    required: true,
  },
  company: {
    type: String, // Nombre de la empresa si es una referencia laboral
    default: null,
  },
  jobTitle: {
    type: String, // Cargo de la referencia en la empresa (si es laboral)
    default: null,
  },
});

// Esquema para cada cargo o movimiento de puesto dentro de la empresa
const jobMovementSchema = new Schema(
  {
    jobTitle: {
      type: String, // Título del cargo (ej. "Desarrollador Junior", "Gerente de Proyectos")
      required: true,
    },
    department: {
      type: String, // Departamento al que pertenece el cargo (ej. "Tecnología", "Recursos Humanos", "Ventas")
      default: null,
    },
    startDate: {
      type: Date, // Fecha de inicio en este cargo específico
      required: true,
    },
    endDate: {
      type: Date, // Fecha de fin en este cargo (puede ser nula si es el cargo actual)
      default: null,
    },
    description: {
      type: String, // Breve descripción de las responsabilidades o logros clave en este cargo
      default: null,
    },
    documents: [documentItemSchema], // Documentos asociados a este movimiento de cargo (ej. Descripción de Cargo firmada)
    // performanceEvaluations: Ahora es un array de ObjectId que referencian al modelo "Evaluations"
    performanceEvaluationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Evaluation", // Referencia al modelo de Evaluaciones de Desempeño
      },
    ],
  },
  {
    timestamps: true, // `createdAt` y `updatedAt` para cada movimiento de cargo
  }
);

// Esquema para registrar cada ajuste salarial
const salaryAdjustmentSchema = new Schema(
  {
    effectiveDate: {
      type: Date, // Fecha en que este ajuste salarial entra en vigencia
      required: true,
    },
    oldSalary: {
      type: Number, // Salario bruto mensual anterior al ajuste
      required: true,
      min: 0,
    },
    newSalary: {
      type: Number, // Nuevo salario bruto mensual después del ajuste
      required: true,
      min: 0,
    },
    currency: {
      type: String, // Moneda del salario (ej. "VES", "USD", "EUR")
      default: "VES",
    },
    reason: {
      type: String, // Razón del ajuste (ej. "Aumento por mérito", "Aumento por inflación", "Promoción", "Revisión anual")
      default: null,
    },
    filePath: {
      type: String, // Ruta al documento de soporte del ajuste salarial (ej. comunicación de aumento)
      required: true,
    },
  },
  {
    timestamps: true, // `createdAt` y `updatedAt` para cada ajuste salarial
  }
);

// Esquema para registrar las formaciones y capacitaciones
const trainingSchema = new Schema(
  {
    name: {
      type: String, // Nombre de la formación, curso o taller
      required: true,
    },
    institution: {
      type: String, // Nombre de la institución o plataforma que impartió la formación
      default: null,
    },
    startDate: {
      type: Date, // Fecha de inicio de la formación
      default: null,
    },
    endDate: {
      type: Date, // Fecha de finalización de la formación
      default: null,
    },
    durationHours: {
      type: Number, // Duración total de la formación en horas (opcional)
      default: null,
    },
    certificateFilePath: {
      type: String, // Ruta al certificado o constancia de la formación
      required: true,
    },
    type: {
      type: String, // Tipo de formación (ej. "Técnica", "Gerencial", "Idiomas", "Seguridad")
      default: null,
    },
    deleted: {
      type: Boolean, // Soft-delete para la formación
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Esquema para los detalles de cada contrato laboral del empleado
const contractDetailSchema = new Schema(
  {
    contractType: {
      type: String, // Tipo de contrato (ej. "Indefinido", "Determinado", "Servicios Profesionales", "Pasantías")
      default: null,
    },
    hireDate: {
      type: Date, // Fecha de inicio de este contrato específico (puede ser la fecha de ingreso inicial o de un nuevo contrato)
      required: true,
    },
    terminationDate: {
      type: Date, // Fecha de terminación de este contrato (nula si es el contrato actual)
      default: null,
    },
    reasonForTermination: {
      type: String, // Razón de la terminación de este contrato (ej. "Renuncia", "Despido", "Fin de contrato", "Movimiento interno")
      default: null,
    },
    jobTitleAtContract: {
      type: String, // Cargo que ocupaba el empleado bajo este contrato
      default: null,
    },
    departmentAtContract: {
      type: String, // Departamento al que pertenecía bajo este contrato
      default: null,
    },
    baseSalaryAtContract: {
      type: Number, // Salario base inicial bajo este contrato
      default: 0,
    },
    salaryCurrencyAtContract: {
      type: String, // Moneda del salario de este contrato
      default: "VES",
    },
    contractFilePath: {
      type: String, // Ruta al documento escaneado del contrato laboral
      required: true,
    },
    deleted: {
      type: Boolean, // Soft-delete para este contrato específico (ej. si se genera un nuevo contrato y el anterior ya no es el activo)
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Esquema para el historial de vacaciones tomadas
const vacationHistoryItemSchema = new Schema(
  {
    startDate: {
      type: Date, // Fecha de inicio del período vacacional tomado
      required: true,
    },
    endDate: {
      type: Date, // Fecha de fin del período vacacional tomado
      required: true,
    },
    period: {
      type: String, // Período fiscal o año al que corresponden estas vacaciones (ej. "2023-2024", "Año 2023")
      required: true,
    },
    daysTaken: {
      type: Number, // Número de días de vacaciones tomados
      required: true,
      min: 0,
    },
    filePath: {
      type: String, // Ruta al documento de solicitud/aprobación de las vacaciones
      required: true,
    },
    deleted: {
      type: Boolean, // Soft-delete para la entrada de vacaciones
      default: false,
    },
  },
  { _id: false }
);

// Esquema para el historial de préstamos o anticipos
const loanHistoryItemSchema = new Schema(
  {
    loanType: {
      type: String, // Tipo de préstamo (ej. "Anticipo de Prestaciones", "Préstamo Personal", "Préstamo Vivienda")
      required: true,
    },
    requestDate: {
      type: Date, // Fecha de solicitud del préstamo
      required: true,
    },
    approvedAmount: {
      type: Number, // Monto aprobado del préstamo
      required: true,
      min: 0,
    },
    currency: {
      type: String, // Moneda del préstamo
      default: "VES",
    },
    outstandingBalance: {
      type: Number, // Saldo pendiente actual del préstamo (se actualiza con los pagos)
      default: 0,
    },
    paymentPlan: {
      type: String, // Descripción del plan de pagos (ej. "12 cuotas mensuales", "Pago único")
      default: null,
    },
    filePath: {
      type: String, // Ruta al documento de solicitud/aprobación del préstamo
      required: true,
    },
    deleted: {
      type: Boolean, // Soft-delete para el préstamo
      default: false,
    },
  },
  { _id: false }
);

// Esquema para la información de las cuentas bancarias del empleado
const bankAccountSchema = new Schema(
  {
    bankName: {
      type: String, // Nombre del banco
      required: true,
    },
    accountType: {
      type: String, // Tipo de cuenta (ej. "Ahorro", "Corriente", "Nómina")
      required: true,
    },
    accountNumber: {
      type: String, // Número de cuenta bancaria. Es importante que sea único para el empleado en este banco.
      required: true,
      unique: true, // Asegura que un empleado no tenga el mismo número de cuenta dos veces
    },
    accountHolderName: {
      type: String, // Nombre del titular de la cuenta (puede ser diferente al empleado en algunos casos)
      default: null,
    },
    status: {
      type: String, // Estado de la cuenta (ej. "Verificada", "Pendiente", "Inválida")
      default: "Pending",
    },
    filePath: {
      type: String, // Ruta al documento de soporte de la cuenta (ej. copia de libreta bancaria, certificación bancaria)
      default: null,
    },
    deleted: {
      type: Boolean, // Soft-delete para la cuenta bancaria
      default: false,
    },
  },
  { _id: false }
);

// Esquema para los dependientes del empleado
const dependentSchema = new Schema(
  {
    name: {
      type: String, // Nombre completo del dependiente (ej. hijo, cónyuge, padre dependiente)
      required: true,
    },
    relationship: {
      type: String, // Parentesco con el empleado (ej. "Hijo", "Cónyuge", "Padre", "Madre")
      required: true,
    },
    birthDate: {
      type: Date, // Fecha de nacimiento del dependiente
      default: null,
    },
    dni: {
      type: String, // Cédula de identidad del dependiente (si aplica)
      default: null,
    },
    filePath: {
      type: String, // Ruta al documento de soporte (ej. Partida de Nacimiento, Cédula de Identidad)
      default: null,
    },
    deleted: {
      type: Boolean, // Soft-delete para el dependiente (ej. si deja de ser carga familiar)
      default: false,
    },
  },
  { _id: false }
);

// --- ESQUEMA PRINCIPAL DEL EMPLEADO ---
const employeeSchema = new Schema(
  {
    // --- DATOS DE IDENTIFICACIÓN Y AUTENTICACIÓN (Nivel Raíz para fácil acceso) ---
    dni: {
      type: String, // Cédula de identidad (Documento Nacional de Identidad). Identificador único principal del empleado.
      unique: true, // Asegura que no haya DNI duplicados
      index: true, // Crea un índice para búsquedas rápidas por DNI
      required: true,
      trim: true,
    },
    employeeIdNumber: {
      type: String, // Número de ficha o ID de empleado interno de la empresa (si existe y es diferente al DNI)
      unique: true, // Asumo que el ID de empleado también es único dentro de la empresa
      index: true, // Crea un índice para búsquedas rápidas
      sparse: true, // Permite que este campo sea nulo o no exista sin violar la unicidad
      default: null,
      trim: true,
    },
    password: {
      type: String, // Contraseña del usuario para inicio de sesión (¡CRÍTICO: HASHear antes de guardar con bcrypt!)
      required: true,
      select: false, // Por defecto, no selecciona este campo en las consultas para seguridad
    },
    roles: [
      {
        ref: "Role", // Referencia a un modelo de "Role" (Schema.Types.ObjectId) para la gestión de permisos y acceso
        type: Schema.Types.ObjectId,
      },
    ],
    status: {
      type: String, // Estado actual del empleado en la empresa
      enum: {
        values: ["Active", "On Leave", "Terminated", "Suspended", "Retired"], // Opciones: "Active" (Activo), "On Leave" (De Permiso/Licencia), "Terminated" (Terminado/Desvinculado), "Suspended" (Suspendido), "Retired" (Jubilado)
        message: "Invalid employee status.",
      },
      default: "Active",
    },
    deleted: {
      type: Boolean, // Indicador para "soft-delete" del registro completo del empleado (no borrado físico)
      default: false,
      index: true, // Útil para filtrar empleados activos rápidamente
    },
    notes: {
      type: String, // Campo para notas internas o observaciones generales sobre el empleado
      default: null,
    },
    companyEntryDate: {
      type: Date, // Fecha de ingreso oficial a la empresa (podría ser la misma que el `hireDate` del primer contrato)
      default: null,
    },

    // --- DATOS PERSONALES BÁSICOS ---
    personalInfo: {
      name: {
        type: String, // Nombre(s) del empleado
        required: true,
        trim: true,
      },
      lastName: {
        type: String, // Apellido(s) del empleado
        required: true,
        trim: true,
      },
      initials: {
        type: String, // Iniciales del empleado
        required: true,
        uppercase: true,
        trim: true,
      },
      birthDate: {
        type: Date, // Fecha de nacimiento
        default: null,
      },
      gender: {
        type: String, // Género
        enum: {
          values: ["Male", "Female", "Other", null], // Opciones permitidas: "Male" (Masculino), "Female" (Femenino), "Other" (Otro), null
          message: "Invalid gender.",
        },
        default: null,
      },
      nationality: {
        type: String, // Nacionalidad (ej. "Venezolana", "Colombiana")
        default: "Venezolana",
        trim: true,
      },
      maritalStatus: {
        type: String, // Estado civil
        enum: {
          values: ["Single", "Married", "Divorced", "Widowed", "Union", null], // Opciones permitidas: "Single" (Soltero/a), "Married" (Casado/a), "Divorced" (Divorciado/a), "Widowed" (Viudo/a), "Union" (Unión Libre), null
          message: "Invalid marital status.",
        },
        default: null,
      },
    },

    // --- INFORMACIÓN DE CONTACTO ---
    contactInfo: {
      email: {
        type: String, // Correo electrónico corporativo o principal del empleado
        unique: true, // Asumo que el email corporativo es único
        index: true,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      },
      personalEmail: {
        type: String, // Correo electrónico personal del empleado (diferente al de trabajo, si aplica)
        default: null,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      },
      phone: {
        type: String, // Número de teléfono principal (móvil)
        required: true,
        trim: true,
      },
      homePhone: {
        type: String, // Número de teléfono fijo (domicilio)
        default: null,
        trim: true,
      },
      emergencyContacts: [emergencyContactSchema], // Contactos de emergencia (un array para múltiples contactos)
    },

    // --- INFORMACIÓN DE DIRECCIÓN GEOGRÁFICA ---
    addressInfo: {
      streetAddress: {
        type: String, // Dirección de residencia completa (Calle, urbanización, casa/apto)
        default: null,
        trim: true,
      },
      city: {
        type: String, // Ciudad de residencia (ej. "Barquisimeto", "Caracas")
        default: null,
        trim: true,
      },
      municipality: {
        type: String, // Municipio de residencia (ej. "Iribarren", "Palavecino"). Un estado puede tener varios municipios.
        default: null,
        trim: true,
      },
      parish: {
        type: String, // Parroquia de residencia (ej. "Catedral", "Concepción"). Un municipio puede tener varias parroquias.
        default: null,
        trim: true,
      },
      state: {
        type: String, // Estado/Provincia de residencia (ej. "Lara", "Miranda")
        default: null,
        trim: true,
      },
      country: {
        type: String, // País de residencia
        default: "Venezuela",
        trim: true,
      },
      zipCode: {
        type: String, // Código postal
        default: null,
        trim: true,
      },
    },

    // --- DOCUMENTACIÓN DEL EXPEDIENTE (REFERENCIAS DE ARCHIVOS ESCANEADOS) ---
    // Cada array contiene objetos con `name`, `filePath`, `uploadDate`, `description` y `expirationDate`
    personalDocuments: [documentItemSchema], // Documentos personales (ej. Resumen Curricular, Copia de Cédula, RIF, Carnet Militar, Título)
    academicSupport: [documentItemSchema], // Soportes de formación académica (ej. Diplomas, Títulos de Postgrado, Certificaciones de Cursos Largos)
    familyDocuments: [documentItemSchema], // Documentos de carga familiar (ej. Acta de Matrimonio, Cédula del Cónyuge, Cédulas y Partidas de Nacimiento de Hijos)
    entryDocuments: [documentItemSchema], // Documentos de Ingreso a la empresa (ej. Contrato Firmado, Formato de Preselección, Resultados de Entrevistas, Evaluación Psicotécnica, Carta de Apertura de Cuenta, Copia de Libreta Bancaria)
    occupationalHealthAndSafety: [documentItemSchema], // Seguridad y Salud Laboral (ej. Notificación de Riesgo, Declaración de Ruta Habitual, Constancias de Inducción, Dotación de Uniformes e Implementos de Seguridad)
    medicalExams: [documentItemSchema], // Exámenes y/o Evaluaciones médicas (ej. Examen pre-empleo, pre-vacacional, post-vacacional, periódico)
    insurances: [documentItemSchema], // Seguros (ej. Póliza de Seguro Colectivo, Constancia de Ingreso al IVSS, Cuenta Individual de IVSS)
    vacationsAndUtilitiesDocuments: [documentItemSchema], // Documentos generales relacionados con Vacaciones y Utilidades (ej. Cálculos de utilidades, liquidaciones de vacaciones)
    socialBenefitsDocuments: [documentItemSchema], // Documentos generales relacionados con Prestaciones Sociales (ej. Carta Autorización, Solicitudes de Anticipos, Estados de Cuenta de Prestaciones)
    previousCompanyPayroll: [documentItemSchema], // Planilla 14-03 de la empresa anterior (documento específico)

    // --- HISTORIAL Y REGISTROS DETALLADOS ---
    jobHistory: [jobMovementSchema], // Historial de cargos y movimientos de puesto dentro de la empresa, incluyendo referencias a evaluaciones de desempeño
    salaryHistory: [salaryAdjustmentSchema], // Historial de todos los ajustes salariales del empleado
    trainingsAndDevelopment: [trainingSchema], // Historial de formaciones, cursos y capacitaciones recibidas
    laborReferences: [referenceSchema], // Referencias laborales del empleado (de empleos anteriores)
    personalReferences: [referenceSchema], // Referencias personales del empleado
    vacationHistory: [vacationHistoryItemSchema], // Historial detallado de los períodos de vacaciones tomados
    loanHistory: [loanHistoryItemSchema], // Historial de préstamos y anticipos recibidos por el empleado
    bankAccounts: [bankAccountSchema], // Cuentas bancarias del empleado para depósitos de nómina y beneficios
    dependents: [dependentSchema], // Información de las cargas familiares del empleado (ej. hijos, cónyuge, padres dependientes)

    // --- INFORMACIÓN LABORAL ACTIVA / HISTORIAL DE CONTRATOS ---
    // Este array contiene los detalles de cada contrato, permitiendo un historial de contratos si el empleado ha tenido varios.
    // El contrato activo sería el último elemento en el array que no está `deleted` y con `terminationDate` nula.
    contractDetails: [contractDetailSchema],
  },
  {
    versionKey: false, // Deshabilita el campo `__v` que Mongoose añade por defecto para control de versiones
    timestamps: true, // Añade `createdAt` y `updatedAt` automáticamente al documento principal del empleado
  }
);

// --- PRE-HOOKS Y MÉTODOS (EJEMPLOS, DESCOMENTAR Y CONFIGURAR SI SE USAN) ---

// Pre-hook para hashear la contraseña antes de guardar o actualizar
// employeeSchema.pre('save', async function(next) {
//   // Solo hashear si la contraseña ha sido modificada (this.isModified('password') ahora que está a nivel raíz)
//   if (!this.isModified('password')) return next();
//   // Asegúrate de instalar bcryptjs: npm install bcryptjs
//   const bcrypt = require('bcryptjs');
//   this.password = await bcrypt.hash(this.password, 12); // 12 es el costo de salting
//   next();
// });

// Método para comparar contraseñas
// employeeSchema.methods.correctPassword = async function(candidatePassword) {
//   // 'this' se refiere al documento del empleado
//   const bcrypt = require('bcryptjs');
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// Exporta el modelo
// export default models?.Employee || model("Employee", employeeSchema);

// --- MODELO ADICIONAL: Evaluation (Ejemplo para las evaluaciones de desempeño) ---
// Este modelo debe ser definido en un archivo separado (ej. 'Evaluation.js')
/*
import { Schema, model, models } from "mongoose";

const evaluationSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee", // Referencia al empleado al que pertenece esta evaluación
      required: true,
    },
    evaluationDate: {
      type: Date, // Fecha en que se realizó la evaluación
      required: true,
    },
    evaluator: {
      type: String, // Nombre o ID del evaluador
      default: null,
    },
    score: {
      type: Number, // Puntuación de la evaluación (si aplica un sistema numérico)
      min: 0,
      max: 100, // Ajustar según el sistema de evaluación
      default: null,
    },
    feedbackSummary: {
      type: String, // Resumen de la retroalimentación cualitativa
      default: null,
    },
    strengths: {
      type: [String], // Array de fortalezas identificadas
      default: [],
    },
    areasForDevelopment: {
      type: [String], // Array de áreas a mejorar
      default: [],
    },
    goalsSet: {
      type: [String], // Array de metas u objetivos establecidos
      default: [],
    },
    filePath: {
      type: String, // Ruta al documento escaneado de la evaluación de desempeño completa
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.Evaluation || model("Evaluation", evaluationSchema);
*/

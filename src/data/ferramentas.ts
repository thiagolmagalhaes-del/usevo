import type { Locale } from "./locales";

export type FerramentaStatus = "active";

export type FerramentaTranslation = {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
};

export type FerramentaTranslations = Partial<Record<Locale, FerramentaTranslation>>;

export type Ferramenta = {
  id: string;
  slug: string;
  localeSlugs: Record<Locale, string>;
  categoryKey: string;
  nome: string;
  descricao: string;
  categoria: string;
  icone: string;
  url: string;
  status: FerramentaStatus;
  enabled: boolean;
  translations: FerramentaTranslations;
};

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toCategoryKey = (value: string) => toSlug(value);

const urlToSlug = (url: string) => {
  const segments = url.split("/").filter(Boolean);
  return toSlug(segments[segments.length - 1] ?? "");
};

const buildTranslations = (
  titlePT: string,
  descriptionPT: string,
  titleEN: string,
  descriptionEN: string,
  titleES: string,
  descriptionES: string,
): FerramentaTranslations => ({
  en: {
    title: titleEN,
    description: descriptionEN,
    seoTitle: `${titleEN} | USEVO TOOLS`,
    seoDescription: descriptionEN,
  },
  "pt-BR": {
    title: titlePT,
    description: descriptionPT,
    seoTitle: `${titlePT} | USEVO TOOLS`,
    seoDescription: descriptionPT,
  },
  es: {
    title: titleES,
    description: descriptionES,
    seoTitle: `${titleES} | USEVO TOOLS`,
    seoDescription: descriptionES,
  },
});

const createFerramenta = (
  nome: string,
  descricao: string,
  categoria: string,
  icone: string,
  url: string,
  translations: FerramentaTranslations,
  localeSlugs: Record<Locale, string>,
): Ferramenta => ({
  id: urlToSlug(url),
  slug: urlToSlug(url),
  localeSlugs,
  categoryKey: toCategoryKey(categoria),
  nome,
  descricao,
  categoria,
  icone,
  url,
  status: "active",
  enabled: true,
  translations,
});

export const getFerramentaByPath = (pathname?: string | null): Ferramenta | undefined => {
  if (!pathname) return undefined;

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return ferramentas.find((ferramenta) => {
    const ferramentaPath = ferramenta.url.replace(/\/+$/, "") || "/";
    return ferramentaPath === normalizedPath;
  });
};

export const getFerramentaTranslation = (
  ferramenta: Ferramenta | undefined,
  locale: Locale = "pt-BR",
): FerramentaTranslation => {
  const translation = ferramenta?.translations?.[locale] ??
    ferramenta?.translations?.["pt-BR"] ??
    ferramenta?.translations?.en ?? {
      title: ferramenta?.nome ?? "Ferramenta",
      description: ferramenta?.descricao ?? "",
      seoTitle: ferramenta?.nome ?? "Ferramenta",
      seoDescription: ferramenta?.descricao ?? "",
    };

  return translation;
};

export const ferramentas: Ferramenta[] = [
  createFerramenta(
    "Calculadora de Porcentagem",
    "Calcule porcentagens, aumentos, descontos e variações.",
    "Finanças",
    "%",
    "/ferramentas/calculadora-de-porcentagem",
    buildTranslations(
      "Calculadora de Porcentagem",
      "Calcule porcentagens, aumentos, descontos e variações.",
      "Percentage Calculator",
      "Calculate percentages, increases, discounts, and variations.",
      "Calculadora de porcentajes",
      "Calcula porcentajes, aumentos, descuentos y variaciones.",
    ),
    {
      "pt-BR": "calculadora-de-porcentagem",
      en: "percentage-calculator",
      es: "calculadora-de-porcentajes",
    },
  ),
  createFerramenta(
    "Calculadora",
    "Faça cálculos rápidos diretamente no navegador.",
    "Calculadoras",
    "+",
    "/ferramentas/calculadora",
    buildTranslations(
      "Calculadora",
      "Faça cálculos rápidos diretamente no navegador.",
      "Calculator",
      "Perform quick calculations directly in your browser.",
      "Calculadora",
      "Haz cálculos rápidos directamente en tu navegador.",
    ),
    {
      "pt-BR": "calculadora",
      en: "calculator",
      es: "calculadora",
    },
  ),
  createFerramenta(
    "Calculadora de datas",
    "Calcule intervalos entre datas e adicione ou subtraia períodos.",
    "Calculadoras",
    "📅",
    "/ferramentas/calculadora-de-datas",
    buildTranslations(
      "Calculadora de datas",
      "Calcule intervalos entre datas e adicione ou subtraia períodos.",
      "Date Calculator",
      "Calculate date intervals and add or subtract periods.",
      "Calculadora de fechas",
      "Calcula intervalos entre fechas y suma o resta períodos.",
    ),
    {
      "pt-BR": "calculadora-de-datas",
      en: "date-calculator",
      es: "calculadora-de-fechas",
    },
  ),
  createFerramenta(
    "Calculadora de idade",
    "Descubra a idade exata e informações sobre o próximo aniversário.",
    "Calculadoras",
    "🎂",
    "/ferramentas/calculadora-de-idade",
    buildTranslations(
      "Calculadora de idade",
      "Descubra a idade exata e informações sobre o próximo aniversário.",
      "Age Calculator",
      "Find an exact age and details about the next birthday.",
      "Calculadora de edad",
      "Descubre la edad exacta e información sobre el próximo cumpleaños.",
    ),
    {
      "pt-BR": "calculadora-de-idade",
      en: "age-calculator",
      es: "calculadora-de-edad",
    },
  ),
  createFerramenta(
    "Conversor de Unidades",
    "Converta comprimento, peso, temperatura e outras unidades.",
    "Conversores",
    "↔",
    "/ferramentas/conversor-de-unidades",
    buildTranslations(
      "Conversor de Unidades",
      "Converta comprimento, peso, temperatura e outras unidades.",
      "Unit Converter",
      "Convert length, weight, temperature, and other units.",
      "Convertidor de unidades",
      "Convierte longitud, peso, temperatura y otras unidades.",
    ),
    {
      "pt-BR": "conversor-de-unidades",
      en: "unit-converter",
      es: "convertidor-de-unidades",
    },
  ),
  createFerramenta(
    "Conversor de Moedas",
    "Converta valores entre diferentes moedas.",
    "Finanças",
    "$",
    "/ferramentas/conversor-de-moedas",
    buildTranslations(
      "Conversor de Moedas",
      "Converta valores entre diferentes moedas.",
      "Currency Converter",
      "Convert values between different currencies.",
      "Convertidor de moneda",
      "Convierte valores entre diferentes monedas.",
    ),
    {
      "pt-BR": "conversor-de-moedas",
      en: "currency-converter",
      es: "convertidor-de-moneda",
    },
  ),
  createFerramenta(
    "Contador de Palavras",
    "Conte palavras, caracteres e linhas de um texto.",
    "Texto",
    "▣",
    "/ferramentas/contador-de-palavras",
    {
      "pt-BR": {
        title: "Contador de Palavras",
        description: "Conte palavras, caracteres, frases, parágrafos, linhas e tempo de leitura.",
        seoTitle: "Contador de Palavras Online Grátis – Palavras e Caracteres | USEVO",
        seoDescription: "Conte palavras, caracteres com e sem espaços, frases, parágrafos, linhas e tempo de leitura instantaneamente.",
      },
      en: {
        title: "Word Counter",
        description: "Count words, characters, sentences, paragraphs, lines, and reading time.",
        seoTitle: "Free Online Word Counter – Words & Characters | USEVO",
        seoDescription: "Count words, characters with and without spaces, sentences, paragraphs, lines, and reading time instantly online.",
      },
      es: {
        title: "Contador de palabras",
        description: "Cuenta palabras, caracteres, frases, párrafos, líneas y tiempo de lectura.",
        seoTitle: "Contador de palabras online gratis – Palabras y caracteres | USEVO",
        seoDescription: "Cuenta palabras, caracteres con y sin espacios, frases, párrafos, líneas y tiempo de lectura al instante.",
      },
    },
    {
      "pt-BR": "contador-de-palavras",
      en: "word-counter",
      es: "contador-de-palabras",
    },
  ),
  createFerramenta(
    "Gerador de Letras Diferentes",
    "Transforme texto em letras diferentes para copiar e colar, usando caracteres Unicode.",
    "Texto",
    "Aa",
    "/ferramentas/gerador-de-letras-diferentes",
    buildTranslations(
      "Gerador de Letras Diferentes",
      "Transforme texto em letras diferentes para copiar e colar, usando caracteres Unicode.",
      "Font Generator",
      "Create fancy Unicode text to copy and paste with this font generator.",
      "Generador de Letras Bonitas",
      "Crea letras bonitas con caracteres Unicode para copiar y pegar.",
    ),
    {
      "pt-BR": "gerador-de-letras-diferentes",
      en: "font-generator",
      es: "generador-de-letras-bonitas",
    },
  ),
  createFerramenta(
    "Gerador de Senhas",
    "Crie senhas fortes e aleatórias em poucos segundos.",
    "Segurança",
    "✦",
    "/ferramentas/gerador-de-senhas",
    buildTranslations(
      "Gerador de Senhas",
      "Crie senhas fortes e aleatórias em poucos segundos.",
      "Password Generator",
      "Create strong random passwords in a few seconds.",
      "Generador de contraseñas",
      "Crea contraseñas seguras y aleatorias en pocos segundos.",
    ),
    {
      "pt-BR": "gerador-de-senhas",
      en: "password-generator",
      es: "generador-de-contrasenas",
    },
  ),
  createFerramenta(
    "Gerador de QR Code",
    "Transforme links e textos em códigos QR.",
    "Utilidades",
    "⌁",
    "/ferramentas/gerador-de-qr-code",
    buildTranslations(
      "Gerador de QR Code",
      "Transforme links e textos em códigos QR.",
      "QR Code Generator",
      "Turn links and text into QR codes.",
      "Generador de códigos QR",
      "Convierte enlaces y textos en códigos QR.",
    ),
    {
      "pt-BR": "gerador-de-qr-code",
      en: "qr-code-generator",
      es: "generador-de-codigos-qr",
    },
  ),
  createFerramenta(
    "Gerador de Código de Barras",
    "Crie códigos de barras em PNG ou SVG diretamente no navegador.",
    "Utilidades",
    "▥",
    "/ferramentas/gerador-de-codigo-de-barras",
    buildTranslations(
      "Gerador de Código de Barras",
      "Crie códigos de barras em PNG ou SVG diretamente no navegador.",
      "Barcode Generator",
      "Create barcode images in PNG or SVG directly in your browser.",
      "Generador de Código de Barras",
      "Crea imágenes de códigos de barras en PNG o SVG directamente en tu navegador.",
    ),
    {
      "pt-BR": "gerador-de-codigo-de-barras",
      en: "barcode-generator",
      es: "generador-de-codigo-de-barras",
    },
  ),
  createFerramenta(
    "Leitor de QR Code",
    "Leia QR Codes por imagem ou câmera diretamente no navegador.",
    "Utilidades",
    "⌁",
    "/ferramentas/leitor-de-qr-code",
    buildTranslations(
      "Leitor de QR Code",
      "Leia QR Codes por imagem ou câmera diretamente no navegador.",
      "QR Code Scanner",
      "Read QR Codes from images or your camera directly in the browser.",
      "Escáner de código QR",
      "Lee códigos QR desde imágenes o la cámara directamente en el navegador.",
    ),
    {
      "pt-BR": "leitor-de-qr-code",
      en: "qr-code-scanner",
      es: "escaner-de-codigo-qr",
    },
  ),
  createFerramenta(
    "Roleta de Nomes",
    "Sorteie nomes e opções em uma roleta visual diretamente no navegador.",
    "Utilidades",
    "◉",
    "/ferramentas/roleta-de-nomes",
    buildTranslations(
      "Roleta de Nomes",
      "Sorteie nomes e opções em uma roleta visual diretamente no navegador.",
      "Wheel of Names",
      "Spin a wheel of names and options locally in your browser.",
      "Ruleta de Nombres",
      "Sortea nombres y opciones con una ruleta visual en tu navegador.",
    ),
    {
      "pt-BR": "roleta-de-nomes",
      en: "wheel-of-names",
      es: "ruleta-de-nombres",
    },
  ),
  createFerramenta(
    "JPG para PDF",
    "Converta imagens JPG em documentos PDF.",
    "Arquivos",
    "▣",
    "/ferramentas/jpg-para-pdf",
    buildTranslations(
      "JPG para PDF",
      "Converta imagens JPG em documentos PDF.",
      "JPG to PDF",
      "Convert JPG images into PDF documents.",
      "JPG a PDF",
      "Convierte imágenes JPG en documentos PDF.",
    ),
    {
      "pt-BR": "jpg-para-pdf",
      en: "jpg-to-pdf",
      es: "jpg-a-pdf",
    },
  ),
  createFerramenta(
    "Base64",
    "Codifique e decodifique textos em Base64 rapidamente.",
    "Desenvolvimento",
    "◆",
    "/ferramentas/base64",
    buildTranslations(
      "Base64",
      "Codifique e decodifique textos em Base64 rapidamente.",
      "Base64",
      "Encode and decode text in Base64 quickly.",
      "Base64",
      "Codifica y decodifica textos en Base64 rápidamente.",
    ),
    {
      "pt-BR": "base64",
      en: "base64",
      es: "base64",
    },
  ),
  createFerramenta(
    "Formatador de JSON",
    "Formate, valide e organize seus dados JSON.",
    "Desenvolvimento",
    "{ }",
    "/ferramentas/formatador-de-json",
    buildTranslations(
      "Formatador de JSON",
      "Formate, valide e organize seus dados JSON.",
      "JSON Formatter",
      "Format, validate, and organize your JSON data.",
      "Formateador de JSON",
      "Formatea, valida y organiza tus datos JSON.",
    ),
    {
      "pt-BR": "formatador-de-json",
      en: "json-formatter",
      es: "formateador-de-json",
    },
  ),
  createFerramenta(
    "JSON Inspector",
    "Inspecione a estrutura dos seus dados JSON.",
    "Desenvolvimento",
    "{ }",
    "/ferramentas/json-inspector",
    buildTranslations(
      "JSON Inspector",
      "Inspecione a estrutura dos seus dados JSON.",
      "JSON Inspector",
      "Inspect the structure of your JSON data.",
      "Inspector de JSON",
      "Inspecciona la estructura de tus datos JSON.",
    ),
    {
      "pt-BR": "json-inspector",
      en: "json-inspector",
      es: "inspector-de-json",
    },
  ),
  createFerramenta(
    "Codificador / decodificador de URL",
    "Codifique e decodifique URLs rapidamente.",
    "Desenvolvimento",
    "⧉",
    "/ferramentas/url-encoder-decoder",
    buildTranslations(
      "Codificador / decodificador de URL",
      "Codifique e decodifique URLs rapidamente.",
      "URL Encoder / Decoder",
      "Encode and decode URLs quickly.",
      "Codificador / decodificador de URL",
      "Codifica y decodifica URLs rápidamente.",
    ),
    {
      "pt-BR": "url-encoder-decoder",
      en: "url-encoder-decoder",
      es: "codificador-decodificador-de-url",
    },
  ),
  createFerramenta(
    "Gerador de UUID",
    "Gere UUIDs (Universally Unique Identifiers) rapidamente.",
    "Desenvolvimento",
    "◎",
    "/ferramentas/uuid-generator",
    buildTranslations(
      "Gerador de UUID",
      "Gere UUIDs (Universally Unique Identifiers) rapidamente.",
      "UUID Generator",
      "Generate UUIDs quickly and reliably.",
      "Generador de UUID",
      "Genera UUIDs de forma rápida y fiable.",
    ),
    {
      "pt-BR": "uuid-generator",
      en: "uuid-generator",
      es: "generador-de-uuid",
    },
  ),
  createFerramenta(
    "Calculadora CLT vs PJ",
    "Compare salário CLT, benefícios e custos com uma proposta PJ em segundos.",
    "Finanças",
    "↔",
    "/ferramentas/calculadora-clt-pj",
    buildTranslations(
      "Calculadora CLT vs PJ",
      "Compare salário CLT, benefícios e custos com uma proposta PJ em segundos.",
      "CLT vs Freelance Calculator",
      "Compare CLT salary, benefits, and costs with a freelance proposal in seconds.",
      "Calculadora CLT vs autónomo",
      "Compara el salario CLT, los beneficios y los costos con una propuesta freelance en segundos.",
    ),
    {
      "pt-BR": "calculadora-clt-pj",
      en: "clt-vs-freelance-calculator",
      es: "calculadora-clt-vs-autonomo",
    },
  ),
  createFerramenta(
    "Comprimir PDF",
    "Reduza o tamanho de arquivos PDF diretamente no navegador.",
    "Arquivos",
    "⤓",
    "/ferramentas/comprimir-pdf",
    buildTranslations(
      "Comprimir PDF",
      "Reduza o tamanho de arquivos PDF diretamente no navegador.",
      "Compress PDF",
      "Reduce the size of PDF files directly in the browser.",
      "Comprimir PDF",
      "Reduce el tamaño de archivos PDF directamente en el navegador.",
    ),
    {
      "pt-BR": "comprimir-pdf",
      en: "compress-pdf",
      es: "comprimir-pdf",
    },
  ),
  createFerramenta(
    "Juntar PDF",
    "Combine vários arquivos PDF em um único documento.",
    "Arquivos",
    "≋",
    "/ferramentas/juntar-pdf",
    buildTranslations(
      "Juntar PDF",
      "Combine vários arquivos PDF em um único documento.",
      "Merge PDF",
      "Combine multiple PDF files into a single document.",
      "Combinar PDF",
      "Combina varios archivos PDF en un único documento.",
    ),
    {
      "pt-BR": "juntar-pdf",
      en: "merge-pdf",
      es: "combinar-pdf",
    },
  ),
  createFerramenta(
    "Dividir PDF",
    "Extraia páginas ou separe um PDF diretamente no navegador.",
    "Arquivos",
    "PDF",
    "/ferramentas/dividir-pdf",
    buildTranslations(
      "Dividir PDF",
      "Extraia páginas ou separe um PDF diretamente no navegador.",
      "Split PDF",
      "Extract pages or split a PDF directly in your browser.",
      "Dividir PDF",
      "Extrae páginas o divide un PDF directamente en tu navegador.",
    ),
    { "pt-BR": "dividir-pdf", en: "split-pdf", es: "dividir-pdf" },
  ),
  createFerramenta("PDF para JPG", "Converta páginas de PDF em imagens JPG no navegador.", "Arquivos", "JPG", "/ferramentas/pdf-para-jpg", buildTranslations("PDF para JPG", "Converta páginas de PDF em imagens JPG no navegador.", "PDF to JPG", "Convert PDF pages to JPG images in your browser.", "PDF a JPG", "Convierte páginas PDF a imágenes JPG en tu navegador."), { "pt-BR": "pdf-para-jpg", en: "pdf-to-jpg", es: "pdf-a-jpg" }),
  createFerramenta("Conversor de Imagens", "Converta imagens JPG, PNG e WebP diretamente no navegador.", "Arquivos", "IMG", "/ferramentas/converter-imagem", buildTranslations("Conversor de Imagens", "Converta imagens JPG, PNG e WebP diretamente no navegador.", "Image Converter", "Convert JPG, PNG, and WebP images directly in your browser.", "Convertidor de imágenes", "Convierte imágenes JPG, PNG y WebP directamente en tu navegador."), { "pt-BR": "converter-imagem", en: "image-converter", es: "convertir-imagen" }),
  createFerramenta(
    "Comprimir Imagem",
    "Reduza o tamanho de imagens JPG, PNG e WebP diretamente no navegador.",
    "Arquivos",
    "🖼",
    "/ferramentas/comprimir-imagem",
    buildTranslations(
      "Comprimir Imagem",
      "Reduza o tamanho de imagens JPG, PNG e WebP diretamente no navegador.",
      "Compress Image",
      "Reduce the size of JPG, PNG, and WebP images directly in the browser.",
      "Comprimir imagen",
      "Reduce el tamaño de imágenes JPG, PNG y WebP directamente en el navegador.",
    ),
    {
      "pt-BR": "comprimir-imagem",
      en: "compress-image",
      es: "comprimir-imagen",
    },
  ),
  createFerramenta(
    "Redimensionador de imagem",
    "Altere largura e altura de imagens JPG, PNG e WebP diretamente no navegador.",
    "Arquivos",
    "↔",
    "/ferramentas/redimensionar-imagem",
    buildTranslations(
      "Redimensionador de imagem",
      "Altere largura e altura de imagens JPG, PNG e WebP diretamente no navegador.",
      "Image Resizer",
      "Change the width and height of JPG, PNG, and WebP images directly in your browser.",
      "Redimensionador de imagen",
      "Cambia el ancho y el alto de imágenes JPG, PNG y WebP directamente en el navegador.",
    ),
    {
      "pt-BR": "redimensionar-imagem",
      en: "image-resizer",
      es: "redimensionar-imagen",
    },
  ),
  createFerramenta(
    "Comparador de Texto",
    "Compare dois textos e visualize as diferenças.",
    "Texto",
    "≣",
    "/ferramentas/comparador-de-texto",
    buildTranslations(
      "Comparador de Texto",
      "Compare dois textos e visualize as diferenças.",
      "Text Comparator",
      "Compare two texts and view the differences.",
      "Comparador de texto",
      "Compara dos textos y visualiza las diferencias.",
    ),
    {
      "pt-BR": "comparador-de-texto",
      en: "text-comparator",
      es: "comparador-de-texto",
    },
  ),
  createFerramenta(
    "Formatador de SQL",
    "Formate e organize consultas SQL automaticamente.",
    "Desenvolvimento",
    "ƒ",
    "/ferramentas/formatador-sql",
    buildTranslations(
      "Formatador de SQL",
      "Formate e organize consultas SQL automaticamente.",
      "SQL Formatter",
      "Format and organize SQL queries automatically.",
      "Formateador de SQL",
      "Formatea y organiza consultas SQL automáticamente.",
    ),
    {
      "pt-BR": "formatador-sql",
      en: "sql-formatter",
      es: "formateador-de-sql",
    },
  ),
];

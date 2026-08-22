import { DEFAULT_LOCALE, FALLBACK_LOCALE, isSupportedLocale, type Locale } from "./locales";

export type UITranslations = {
  tools: string;
  categories: string;
  exploreTools: string;
  allTools: string;
  search: string;
  popularTools: string;
  freeOnlineTools: string;
  footerTools: string;
  footerCategories: string;
  home: string;
  back: string;
  copy: string;
  clear: string;
  format: string;
  download: string;
  upload: string;
  language: string;
  noResults: string;
};

export type ToolKey =
  | "calculadora-de-porcentagem"
  | "calculadora"
  | "conversor-de-unidades"
  | "conversor-de-moedas"
  | "contador-de-palavras"
  | "gerador-de-senhas"
  | "gerador-de-qr-code"
  | "jpg-para-pdf"
  | "base64"
  | "formatador-de-json"
  | "json-inspector"
  | "url-encoder-decoder"
  | "uuid-generator"
  | "calculadora-clt-pj"
  | "comprimir-pdf"
  | "juntar-pdf"
  | "comprimir-imagem"
  | "comparador-de-texto"
  | "formatador-sql";

export type ToolUiCommon = {
  back: string;
  copy: string;
  clear: string;
  format: string;
  upload: string;
  download: string;
  processing: string;
  error: string;
  success: string;
  retry: string;
  cancel: string;
  confirm: string;
};

export type ToolUiCatalog = {
  common: ToolUiCommon;
  tools: Record<ToolKey, Record<string, string>>;
};

export type CategoryKey =
  | "financas"
  | "calculadoras"
  | "conversores"
  | "texto"
  | "seguranca"
  | "utilidades"
  | "arquivos"
  | "desenvolvimento";

export const categoryTranslations: Record<CategoryKey, Record<Locale, string>> = {
  financas: {
    en: "Finance",
    "pt-BR": "Finanças",
    es: "Finanzas",
  },
  calculadoras: {
    en: "Calculators",
    "pt-BR": "Calculadoras",
    es: "Calculadoras",
  },
  conversores: {
    en: "Converters",
    "pt-BR": "Conversores",
    es: "Convertidores",
  },
  texto: {
    en: "Text",
    "pt-BR": "Texto",
    es: "Texto",
  },
  seguranca: {
    en: "Security",
    "pt-BR": "Segurança",
    es: "Seguridad",
  },
  utilidades: {
    en: "Utilities",
    "pt-BR": "Utilidades",
    es: "Utilidades",
  },
  arquivos: {
    en: "Files",
    "pt-BR": "Arquivos",
    es: "Archivos",
  },
  desenvolvimento: {
    en: "Development",
    "pt-BR": "Desenvolvimento",
    es: "Desarrollo",
  },
};

export const uiTranslations: Record<Locale, UITranslations> = {
  en: {
    tools: "Tools",
    categories: "Categories",
    exploreTools: "Explore tools",
    allTools: "All tools",
    search: "Search",
    popularTools: "Popular tools",
    freeOnlineTools: "Free online tools",
    footerTools: "Tools",
    footerCategories: "Categories",
    home: "Home",
    back: "Back",
    copy: "Copy",
    clear: "Clear",
    format: "Format",
    download: "Download",
    upload: "Upload",
    language: "Language",
    noResults: "No tools found.",
  },
  "pt-BR": {
    tools: "Ferramentas",
    categories: "Categorias",
    exploreTools: "Explorar ferramentas",
    allTools: "Todas as ferramentas",
    search: "Buscar",
    popularTools: "Ferramentas populares",
    freeOnlineTools: "Ferramentas online grátis",
    footerTools: "Ferramentas",
    footerCategories: "Categorias",
    home: "Início",
    back: "Voltar",
    copy: "Copiar",
    clear: "Limpar",
    format: "Formatar",
    download: "Baixar",
    upload: "Enviar",
    language: "Idioma",
    noResults: "Nenhuma ferramenta encontrada.",
  },
  es: {
    tools: "Herramientas",
    categories: "Categorías",
    exploreTools: "Explorar herramientas",
    allTools: "Todas las herramientas",
    search: "Buscar",
    popularTools: "Herramientas populares",
    freeOnlineTools: "Herramientas online gratuitas",
    footerTools: "Herramientas",
    footerCategories: "Categorías",
    home: "Inicio",
    back: "Atrás",
    copy: "Copiar",
    clear: "Limpiar",
    format: "Formatear",
    download: "Descargar",
    upload: "Subir",
    language: "Idioma",
    noResults: "No se encontraron herramientas.",
  },
};

const emptyToolUi = (): Record<ToolKey, Record<string, string>> => ({
  "calculadora-de-porcentagem": {},
  calculadora: {},
  "conversor-de-unidades": {},
  "conversor-de-moedas": {},
  "contador-de-palavras": {},
  "gerador-de-senhas": {},
  "gerador-de-qr-code": {},
  "jpg-para-pdf": {},
  base64: {},
  "formatador-de-json": {},
  "json-inspector": {},
  "url-encoder-decoder": {},
  "uuid-generator": {},
  "calculadora-clt-pj": {},
  "comprimir-pdf": {},
  "juntar-pdf": {},
  "comprimir-imagem": {},
  "comparador-de-texto": {},
  "formatador-sql": {},
});

export const toolUi: Record<Locale, ToolUiCatalog> = {
  "pt-BR": {
    common: {
      back: "Voltar",
      copy: "Copiar",
      clear: "Limpar",
      format: "Formatar",
      upload: "Enviar",
      download: "Baixar",
      processing: "Processando...",
      error: "Erro",
      success: "Sucesso",
      retry: "Tentar novamente",
      cancel: "Cancelar",
      confirm: "Confirmar",
    },
       tools: {
      ...emptyToolUi(),
      "calculadora-de-porcentagem": {
        title: "Calculadora de Porcentagem",
        description: "Descubra rapidamente quanto uma porcentagem representa de um determinado valor.",
        category: "Finanças",
        percentage: "Porcentagem (%)",
        percentagePlaceholder: "Ex.: 15",
        value: "Valor",
        valuePlaceholder: "Ex.: 500",
        calculate: "Calcular",
        result: "Resultado",
        formula: "{percentage}% de {value} = {calculated}",
        onlineTools: "Ferramentas online",
      },
      calculadora: {
        title: "Calculadora",
        description: "Faça cálculos rápidos diretamente no seu navegador.",
        category: "Calculadoras",
        placeholder: "Digite um cálculo...",
        clear: "Limpar",
        error: "Erro",
        invalidExpression: "Expressão inválida",
      },
      "conversor-de-unidades": {
        badge: "Conversores",
        title: "Conversor de Unidades",
        description: "Converta unidades de comprimento, peso, temperatura e outras rapidamente.",
        conversionType: "Tipo de conversão",
        length: "Comprimento",
        weight: "Peso",
        temperature: "Temperatura",
        volume: "Volume",
        from: "De",
        to: "Para",
        value: "Valor",
        valuePlaceholder: "Digite um valor",
        convert: "Converter",
        result: "Resultado",
        invalidValue: "Digite um valor válido",
      },
      "conversor-de-moedas": {
        category: "Finanças",
        from: "De",
        to: "Para",
        swapCurrencies: "Trocar moedas",
        amount: "Valor",
        amountPlaceholder: "Digite um valor",
        convert: "Converter",
        converting: "Convertendo...",
        result: "Resultado",
        invalidValue: "Digite um valor válido.",
        directConversion: "Conversão direta",
        rateAsOf: "Taxa em {date}",
        fetchError: "Não foi possível obter a taxa de câmbio agora. Tente novamente.",
      },
      "contador-de-palavras": {
        category: "Texto",
        title: "Contador de Palavras",
        description: "Conte palavras, caracteres, frases e linhas em qualquer texto.",
        placeholder: "Digite ou cole seu texto aqui...",
        count: "Contar",
        words: "Palavras",
        characters: "Caracteres",
        sentences: "Frases",
        lines: "Linhas",
      },
      "gerador-de-senhas": {
        category: "Segurança",
        title: "Gerador de Senhas",
        description: "Crie senhas fortes e aleatórias em segundos.",
        copy: "Copiar",
        copied: "Copiado!",
        passwordLength: "Comprimento da senha",
        uppercaseLetters: "Letras maiúsculas",
        lowercaseLetters: "Letras minúsculas",
        numbers: "Números",
        symbols: "Símbolos",
        strength: "Força:",
        weak: "Fraca",
        strong: "Forte",
        veryStrong: "Muito forte",
        selectAtLeastOneOption: "Selecione pelo menos uma opção",
        generateNewPassword: "Gerar nova senha",
      },
      "gerador-de-qr-code": {
        category: "Utilidades",
        title: "Gerador de QR Code",
        description: "Transforme links e textos em QR Codes rapidamente.",
        linkOrText: "Link ou texto",
        placeholder: "Digite um link ou texto...",
        generate: "Gerar QR Code",
        emptyInputError: "Digite algum texto ou link para gerar o QR Code.",
        generationError: "Não foi possível gerar o QR Code. Tente novamente.",
        yourQrCode: "Seu QR Code",
        generatedQrCodeAlt: "QR Code gerado",
        downloadQrCode: "Baixar QR Code",
      },
      "jpg-para-pdf": {
        category: "Arquivos",
        title: "JPG para PDF",
        description: "Converta imagens JPG em documentos PDF rapidamente.",
        selectImage: "Clique para selecionar uma imagem",
        supportedFormats: "JPG, JPEG ou PNG",
        imagePreviewAlt: "Prévia da imagem",
        convertToPdf: "Converter para PDF",
        success: "PDF criado com sucesso!",
        invalidImageError: "Selecione uma imagem JPG, JPEG ou PNG.",
      },
      base64: {
        category: "Desenvolvimento",
        title: "Codificador Base64",
        description: "Converta texto em Base64 e decodifique Base64 em texto rapidamente.",
        inputLabel: "Texto ou Base64",
        placeholder: "Digite ou cole seu texto aqui...",
        textToBase64: "Texto → Base64",
        base64ToText: "Base64 → Texto",
        result: "Resultado",
        copyResult: "Copiar resultado",
        emptyTextError: "✕ Digite algum texto para converter.",
        encodeSuccess: "✓ Texto convertido para Base64 com sucesso!",
        encodeError: "✕ Não foi possível converter o texto.",
        emptyBase64Error: "✕ Digite um código Base64.",
        decodeSuccess: "✓ Base64 decodificado com sucesso!",
        invalidBase64Error: "✕ Base64 inválido. Verifique o código e tente novamente.",
        copiedSuccess: "✓ Resultado copiado!",
        copyError: "✕ Não foi possível copiar automaticamente.",
      },
    },
  },
  en: {
    common: {
      back: "Back",
      copy: "Copy",
      clear: "Clear",
      format: "Format",
      upload: "Upload",
      download: "Download",
      processing: "Processing...",
      error: "Error",
      success: "Success",
      retry: "Retry",
      cancel: "Cancel",
      confirm: "Confirm",
    },
        tools: {
      ...emptyToolUi(),
      "calculadora-de-porcentagem": {
        title: "Percentage Calculator",
        description: "Quickly find out how much a percentage of a given value represents.",
        category: "Finance",
        percentage: "Percentage (%)",
        percentagePlaceholder: "E.g.: 15",
        value: "Value",
        valuePlaceholder: "E.g.: 500",
        calculate: "Calculate",
        result: "Result",
        formula: "{percentage}% of {value} = {calculated}",
        onlineTools: "Online Tools",
      },
      calculadora: {
        title: "Calculator",
        description: "Do quick calculations right in your browser.",
        category: "Calculators",
        placeholder: "Type a calculation...",
        clear: "Clear",
        error: "Error",
        invalidExpression: "Invalid expression",
      },
      "conversor-de-unidades": {
        badge: "Converters",
        title: "Unit Converter",
        description: "Convert length, weight, temperature and other units quickly.",
        conversionType: "Conversion type",
        length: "Length",
        weight: "Weight",
        temperature: "Temperature",
        volume: "Volume",
        from: "From",
        to: "To",
        value: "Value",
        valuePlaceholder: "Enter a value",
        convert: "Convert",
        result: "Result",
        invalidValue: "Enter a valid value",
      },
      "conversor-de-moedas": {
        category: "Finance",
        from: "From",
        to: "To",
        swapCurrencies: "Swap currencies",
        amount: "Amount",
        amountPlaceholder: "Enter a value",
        convert: "Convert",
        converting: "Converting...",
        result: "Result",
        invalidValue: "Enter a valid value.",
        directConversion: "Direct conversion",
        rateAsOf: "Rate as of {date}",
        fetchError: "Could not fetch the exchange rate right now. Please try again.",
      },
      "contador-de-palavras": {
        category: "Text",
        title: "Word Counter",
        description: "Count words, characters, sentences, and lines in any text.",
        placeholder: "Type or paste your text here...",
        count: "Count",
        words: "Words",
        characters: "Characters",
        sentences: "Sentences",
        lines: "Lines",
      },
      "gerador-de-senhas": {
        category: "Security",
        title: "Password Generator",
        description: "Create strong, random passwords in seconds.",
        copy: "Copy",
        copied: "Copied!",
        passwordLength: "Password length",
        uppercaseLetters: "Uppercase letters",
        lowercaseLetters: "Lowercase letters",
        numbers: "Numbers",
        symbols: "Symbols",
        strength: "Strength:",
        weak: "Weak",
        strong: "Strong",
        veryStrong: "Very strong",
        selectAtLeastOneOption: "Select at least one option",
        generateNewPassword: "Generate new password",
      },
      "gerador-de-qr-code": {
        category: "Utilities",
        title: "QR Code Generator",
        description: "Turn links and text into QR codes quickly.",
        linkOrText: "Link or text",
        placeholder: "Enter a link or text...",
        generate: "Generate QR Code",
        emptyInputError: "Enter some text or a link to generate the QR Code.",
        generationError: "Could not generate the QR Code. Please try again.",
        yourQrCode: "Your QR Code",
        generatedQrCodeAlt: "Generated QR Code",
        downloadQrCode: "Download QR Code",
      },
      "jpg-para-pdf": {
        category: "Files",
        title: "JPG to PDF",
        description: "Convert JPG images into PDF documents quickly.",
        selectImage: "Click to select an image",
        supportedFormats: "JPG, JPEG or PNG",
        imagePreviewAlt: "Image preview",
        convertToPdf: "Convert to PDF",
        success: "PDF created successfully!",
        invalidImageError: "Please select a JPG, JPEG or PNG image.",
      },
      base64: {
        category: "Development",
        title: "Base64 Encoder",
        description: "Convert text to Base64 and decode Base64 to text quickly.",
        inputLabel: "Text or Base64",
        placeholder: "Type or paste your text here...",
        textToBase64: "Text → Base64",
        base64ToText: "Base64 → Text",
        result: "Result",
        copyResult: "Copy result",
        emptyTextError: "✕ Enter some text to convert.",
        encodeSuccess: "✓ Text converted to Base64 successfully!",
        encodeError: "✕ Could not convert the text.",
        emptyBase64Error: "✕ Enter a Base64 code.",
        decodeSuccess: "✓ Base64 decoded successfully!",
        invalidBase64Error: "✕ Invalid Base64. Check the code and try again.",
        copiedSuccess: "✓ Result copied!",
        copyError: "✕ Could not copy automatically.",
      },
    },  },
  es: {
    common: {
      back: "Volver",
      copy: "Copiar",
      clear: "Limpiar",
      format: "Formatear",
      upload: "Subir",
      download: "Descargar",
      processing: "Procesando...",
      error: "Error",
      success: "Éxito",
      retry: "Reintentar",
      cancel: "Cancelar",
      confirm: "Confirmar",
    },
        tools: {
      ...emptyToolUi(),
      "calculadora-de-porcentagem": {
        title: "Calculadora de Porcentajes",
        description: "Descubre rápidamente cuánto representa un porcentaje de un valor determinado.",
        category: "Finanzas",
        percentage: "Porcentaje (%)",
        percentagePlaceholder: "Ej.: 15",
        value: "Valor",
        valuePlaceholder: "Ej.: 500",
        calculate: "Calcular",
        result: "Resultado",
        formula: "{percentage}% de {value} = {calculated}",
        onlineTools: "Herramientas online",
      },
      calculadora: {
        title: "Calculadora",
        description: "Realiza cálculos rápidos directamente en tu navegador.",
        category: "Calculadoras",
        placeholder: "Escribe un cálculo...",
        clear: "Limpiar",
        error: "Error",
        invalidExpression: "Expresión inválida",
      },
      "conversor-de-unidades": {
        badge: "Convertidores",
        title: "Convertidor de Unidades",
        description: "Convierte unidades de longitud, peso, temperatura y otras rápidamente.",
        conversionType: "Tipo de conversión",
        length: "Longitud",
        weight: "Peso",
        temperature: "Temperatura",
        volume: "Volumen",
        from: "De",
        to: "A",
        value: "Valor",
        valuePlaceholder: "Introduce un valor",
        convert: "Convertir",
        result: "Resultado",
        invalidValue: "Introduce un valor válido",
      },
      "conversor-de-moedas": {
        category: "Finanzas",
        from: "De",
        to: "A",
        swapCurrencies: "Intercambiar monedas",
        amount: "Cantidad",
        amountPlaceholder: "Introduce un valor",
        convert: "Convertir",
        converting: "Convirtiendo...",
        result: "Resultado",
        invalidValue: "Introduce un valor válido.",
        directConversion: "Conversión directa",
        rateAsOf: "Tipo de cambio al {date}",
        fetchError: "No se pudo obtener el tipo de cambio ahora. Inténtalo de nuevo.",
      },
      "contador-de-palavras": {
        category: "Texto",
        title: "Contador de Palabras",
        description: "Cuenta palabras, caracteres, oraciones y líneas en cualquier texto.",
        placeholder: "Escribe o pega tu texto aquí...",
        count: "Contar",
        words: "Palabras",
        characters: "Caracteres",
        sentences: "Oraciones",
        lines: "Líneas",
      },
      "gerador-de-senhas": {
        category: "Seguridad",
        title: "Generador de Contraseñas",
        description: "Crea contraseñas seguras y aleatorias en segundos.",
        copy: "Copiar",
        copied: "¡Copiado!",
        passwordLength: "Longitud de la contraseña",
        uppercaseLetters: "Letras mayúsculas",
        lowercaseLetters: "Letras minúsculas",
        numbers: "Números",
        symbols: "Símbolos",
        strength: "Seguridad:",
        weak: "Débil",
        strong: "Fuerte",
        veryStrong: "Muy fuerte",
        selectAtLeastOneOption: "Selecciona al menos una opción",
        generateNewPassword: "Generar nueva contraseña",
      },
      "gerador-de-qr-code": {
        category: "Utilidades",
        title: "Generador de Códigos QR",
        description: "Convierte enlaces y texto en códigos QR rápidamente.",
        linkOrText: "Enlace o texto",
        placeholder: "Introduce un enlace o texto...",
        generate: "Generar código QR",
        emptyInputError: "Introduce algún texto o enlace para generar el código QR.",
        generationError: "No se pudo generar el código QR. Inténtalo de nuevo.",
        yourQrCode: "Tu código QR",
        generatedQrCodeAlt: "Código QR generado",
        downloadQrCode: "Descargar código QR",
      },
      "jpg-para-pdf": {
        category: "Archivos",
        title: "JPG a PDF",
        description: "Convierte imágenes JPG en documentos PDF rápidamente.",
        selectImage: "Haz clic para seleccionar una imagen",
        supportedFormats: "JPG, JPEG o PNG",
        imagePreviewAlt: "Vista previa de la imagen",
        convertToPdf: "Convertir a PDF",
        success: "¡PDF creado correctamente!",
        invalidImageError: "Selecciona una imagen JPG, JPEG o PNG.",
      },
      base64: {
        category: "Desarrollo",
        title: "Codificador Base64",
        description: "Convierte texto a Base64 y decodifica Base64 a texto rápidamente.",
        inputLabel: "Texto o Base64",
        placeholder: "Escribe o pega tu texto aquí...",
        textToBase64: "Texto → Base64",
        base64ToText: "Base64 → Texto",
        result: "Resultado",
        copyResult: "Copiar resultado",
        emptyTextError: "✕ Introduce algún texto para convertir.",
        encodeSuccess: "✓ ¡Texto convertido a Base64 correctamente!",
        encodeError: "✕ No se pudo convertir el texto.",
        emptyBase64Error: "✕ Introduce un código Base64.",
        decodeSuccess: "✓ ¡Base64 decodificado correctamente!",
        invalidBase64Error: "✕ Base64 no válido. Comprueba el código e inténtalo de nuevo.",
        copiedSuccess: "✓ ¡Resultado copiado!",
        copyError: "✕ No se pudo copiar automáticamente.",
      },
    },
  },
};

export const getTranslations = (locale?: string | null): UITranslations => {
  const resolvedLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return uiTranslations[resolvedLocale] ?? uiTranslations[FALLBACK_LOCALE];
};

export const getToolUi = (locale?: string | null): ToolUiCatalog => {
  const resolvedLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return toolUi[resolvedLocale] ?? toolUi[FALLBACK_LOCALE];
};

export const getCategoryTranslation = (categoryKey: string, locale?: string | null): string => {
  const resolvedLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const normalizedKey = categoryKey.trim().toLowerCase();
  const translation = categoryTranslations[normalizedKey as CategoryKey];
  return translation?.[resolvedLocale] ?? normalizedKey;
};

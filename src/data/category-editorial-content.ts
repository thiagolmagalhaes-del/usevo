import type { Locale } from "./locales";

export const CATEGORY_KEYS = ["arquivos", "calculadoras", "conversores", "desenvolvimento", "financas", "seguranca", "texto", "utilidades"] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number];
export type CategoryGuide = { title: string; introduction: string; tips: [string, string, string] };

export const categoryEditorialContent: Record<CategoryKey, Record<Locale, CategoryGuide>> = {
  arquivos: {
    "pt-BR": {
      title: "Prepare PDFs e imagens para o destino certo",
      introduction: "Um limite de upload pode exigir um arquivo menor, enquanto um envio de documentos pede páginas na ordem certa. Escolha a operação pelo problema: juntar e dividir PDF alteram a organização; comprimir reduz o tamanho; converter e redimensionar imagens mudam formato e dimensões. Fazer todas essas etapas sem necessidade pode prejudicar a legibilidade.",
      tips: [
        "Para reunir comprovantes, junte os PDFs na ordem de leitura; para enviar apenas um trecho, divida o documento. Ao criar um PDF a partir de JPG, confira orientação e margens antes de compartilhar.",
        "Se o destino limita o peso do arquivo, experimente Comprimir PDF ou Comprimir Imagem e compare tamanho e legibilidade. Se exige largura e altura, use o Redimensionador de imagem; reduzir dimensões não é o mesmo que trocar o formato.",
        "Abra o arquivo exportado e revise todas as páginas, textos pequenos, cores e transparência. PDF para JPG transforma páginas em imagens; mantenha o PDF ou a imagem original para futuras edições e uma nova exportação.",
      ],
    },
    en: {
      title: "Prepare PDFs and images for their destination",
      introduction: "An upload limit may call for a smaller file, while a document submission needs pages in the right order. Pick the operation that addresses the problem: merging and splitting PDFs change their organization; compression reduces file size; image conversion and resizing change format and dimensions. Applying every step unnecessarily can make the result harder to read.",
      tips: [
        "Merge receipt PDFs in reading order, or split a document to send only the relevant pages. When creating a PDF from JPG images, check orientation and margins before sharing it.",
        "For a file size limit, try Compress PDF or Compress Image and compare size with readability. For a width or height requirement, use Image Resizer; reducing dimensions and changing format solve different problems.",
        "Open the exported file and review every page, small text, colors, and transparency. PDF to JPG turns pages into images; keep the original PDF or image for later edits and another export.",
      ],
    },
    es: {
      title: "Prepara PDF e imágenes para su destino",
      introduction: "Un límite de subida puede exigir un archivo más pequeño, mientras que enviar documentos requiere páginas en el orden correcto. Elige la operación según el problema: combinar y dividir PDF cambian la organización; comprimir reduce el tamaño; convertir y redimensionar imágenes cambian el formato y las dimensiones. Aplicar todos los pasos sin necesidad puede perjudicar la legibilidad.",
      tips: [
        "Combina los PDF de comprobantes en orden de lectura o divide un documento para enviar solo las páginas necesarias. Al crear un PDF desde JPG, revisa orientación y márgenes antes de compartirlo.",
        "Si el destino limita el peso, prueba Comprimir PDF o Comprimir imagen y compara tamaño y legibilidad. Si exige ancho y alto, utiliza el Redimensionador de imagen; reducir dimensiones y cambiar formato resuelven problemas distintos.",
        "Abre el archivo exportado y revisa todas las páginas, textos pequeños, colores y transparencia. PDF a JPG convierte páginas en imágenes; conserva el PDF o la imagen original para futuras ediciones y exportaciones.",
      ],
    },
  },
  calculadoras: {
    "pt-BR": {
      title: "Escolha entre contas, intervalos e idade",
      introduction: "A calculadora comum resolve operações numéricas, mas uma diferença entre datas depende do calendário. A Calculadora de datas serve para medir intervalos ou deslocar uma data por um período; a Calculadora de idade usa nascimento e data de referência. Separar essas tarefas evita tratar meses de durações diferentes como blocos fixos de dias.",
      tips: [
        "Na Calculadora, registre os valores e a operação que deseja conferir. Para uma conta em etapas, confira os resultados intermediários antes de usar o total em outra tarefa.",
        "Na Calculadora de datas, escolha entre calcular um intervalo e adicionar ou subtrair um período. Confira a ordem das datas e a regra de inclusão dos extremos antes de interpretar o número de dias.",
        "Na Calculadora de idade, confira nascimento e data de referência. Idade em anos completos não é uma divisão dos dias por 365; para prazos contratuais, confirme a regra de contagem exigida pelo documento.",
      ],
    },
    en: {
      title: "Choose arithmetic, date intervals, or age",
      introduction: "The Calculator handles numerical operations, but the difference between dates depends on the calendar. Date Calculator measures intervals or moves a date forward or backward by a period; Age Calculator uses a birth date and a reference date. Keeping these tasks separate avoids treating months of different lengths as fixed blocks of days.",
      tips: [
        "In Calculator, write down the values and operation you want to check. For a calculation with several steps, verify intermediate results before using the total elsewhere.",
        "In Date Calculator, choose between measuring an interval and adding or subtracting a period. Check date order and whether the endpoints are included before interpreting the day count.",
        "In Age Calculator, check the birth date and reference date. Completed years of age are not obtained by dividing days by 365; for contractual deadlines, confirm the counting rule required by the document.",
      ],
    },
    es: {
      title: "Elige operaciones, intervalos de fechas o edad",
      introduction: "La Calculadora resuelve operaciones numéricas, pero la diferencia entre fechas depende del calendario. La Calculadora de fechas mide intervalos o desplaza una fecha un período; la Calculadora de edad utiliza nacimiento y fecha de referencia. Separar estas tareas evita tratar meses de distinta duración como bloques fijos de días.",
      tips: [
        "En la Calculadora, anota los valores y la operación que quieres comprobar. Para una cuenta con varios pasos, verifica los resultados intermedios antes de utilizar el total en otra tarea.",
        "En la Calculadora de fechas, elige entre medir un intervalo y sumar o restar un período. Revisa el orden de las fechas y la inclusión de los extremos antes de interpretar el número de días.",
        "En la Calculadora de edad, comprueba nacimiento y fecha de referencia. Los años cumplidos no se obtienen dividiendo los días por 365; para plazos contractuales, confirma la regla de cómputo del documento.",
      ],
    },
  },
  conversores: {
    "pt-BR": {
      title: "Converta medidas sem perder a unidade",
      introduction: "O Conversor de Unidades ajuda a comparar medidas escritas em sistemas diferentes, como comprimento, peso e temperatura. A escolha da grandeza vem antes do número: um valor sem unidade não descreve uma medida completa. Guarde a unidade de origem e a de destino junto ao resultado para que outra pessoa consiga reproduzir a conversão.",
      tips: [
        "Selecione a grandeza e confirme as duas unidades antes de digitar. Para comparar centímetros com polegadas, converta os valores para a mesma unidade em vez de comparar apenas os números.",
        "Em temperatura, não aplique a proporção usada para comprimento ou peso: Celsius e Fahrenheit têm escalas e pontos de origem diferentes. Use a opção de temperatura do conversor.",
        "Evite arredondar a cada etapa de uma conversão. Preserve o resultado disponível e arredonde no final conforme a precisão da medida original; casas decimais extras não tornam a medição mais precisa.",
      ],
    },
    en: {
      title: "Convert measurements without losing their units",
      introduction: "Unit Converter helps compare measurements expressed in different systems, including length, weight, and temperature. Choose the quantity before entering the number: a value without a unit is not a complete measurement. Keep both the source and target units with the result so someone else can reproduce the conversion.",
      tips: [
        "Select the quantity and check both units before entering a value. To compare centimeters with inches, convert the measurements to the same unit instead of comparing bare numbers.",
        "For temperature, do not apply the proportional rule used for length or weight: Celsius and Fahrenheit have different scales and starting points. Use the converter's temperature option.",
        "Avoid rounding at every step. Preserve the available result and round at the end according to the precision of the original measurement; extra decimal places do not make a measurement more accurate.",
      ],
    },
    es: {
      title: "Convierte medidas sin perder sus unidades",
      introduction: "El Convertidor de unidades permite comparar medidas expresadas en sistemas diferentes, como longitud, peso y temperatura. Elige la magnitud antes de introducir el número: un valor sin unidad no describe una medida completa. Guarda las unidades de origen y destino junto al resultado para que otra persona pueda reproducir la conversión.",
      tips: [
        "Selecciona la magnitud y comprueba ambas unidades antes de introducir el valor. Para comparar centímetros con pulgadas, convierte las medidas a la misma unidad en lugar de comparar solo los números.",
        "Para temperatura, no apliques la proporción utilizada para longitud o peso: Celsius y Fahrenheit tienen escalas y puntos de origen distintos. Usa la opción de temperatura del convertidor.",
        "Evita redondear en cada etapa. Conserva el resultado disponible y redondea al final según la precisión de la medida original; añadir decimales no hace que una medición sea más precisa.",
      ],
    },
  },
  desenvolvimento: {
    "pt-BR": {
      title: "Prepare dados e consultas antes de integrar",
      introduction: "JSON Formatter e JSON Inspector ajudam a ler dados estruturados; o Formatador de SQL organiza consultas para revisão. Base64 e o codificador de URL tratam representações de texto, enquanto o Gerador de UUID cria identificadores. Escolha pela etapa do trabalho: melhorar a apresentação não confirma que os dados atendem ao contrato de uma API ou que uma consulta produzirá o resultado esperado.",
      tips: [
        "Use o formatador para tornar JSON legível e o inspector para examinar sua estrutura. Mesmo quando a sintaxe é aceita, confira tipos, campos obrigatórios e valores contra o esquema esperado pela aplicação.",
        "No SQL, selecione o dialeto da consulta e revise o resultado. Formatar não equivale a validar ou executar código: teste a consulta no ambiente apropriado antes de aplicá-la a dados reais.",
        "Não insira segredos, tokens ou dados de clientes; use exemplos anonimizados. Base64 é codificação, não criptografia; confira a ida e volta ao codificar URLs, e não trate um UUID como senha ou autorização de acesso.",
      ],
    },
    en: {
      title: "Prepare data and queries before integration",
      introduction: "JSON Formatter and JSON Inspector help read structured data; SQL Formatter organizes queries for review. Base64 and URL Encoder / Decoder handle text representations, while UUID Generator creates identifiers. Choose the tool for your workflow stage: improving presentation does not prove that data meets an API contract or that a query will return the intended result.",
      tips: [
        "Use the formatter to make JSON readable and the inspector to examine its structure. Even when syntax is accepted, check types, required fields, and values against the application's expected schema.",
        "For SQL, select the query's dialect and review the output. Formatting is not validation or code execution: test the query in the appropriate environment before applying it to real data.",
        "Do not enter secrets, tokens, or customer data; use anonymized samples. Base64 is encoding, not encryption; check the round trip when encoding URLs, and do not treat a UUID as a password or access authorization.",
      ],
    },
    es: {
      title: "Prepara datos y consultas antes de integrarlos",
      introduction: "El Formateador de JSON y el Inspector de JSON ayudan a leer datos estructurados; el Formateador de SQL organiza consultas para revisarlas. Base64 y el codificador de URL trabajan con representaciones de texto, mientras que el Generador de UUID crea identificadores. Elige según la etapa del trabajo: mejorar la presentación no demuestra que los datos cumplan el contrato de una API ni que una consulta dé el resultado esperado.",
      tips: [
        "Usa el formateador para hacer legible el JSON y el inspector para examinar su estructura. Aunque la sintaxis sea aceptada, comprueba tipos, campos obligatorios y valores con el esquema esperado por la aplicación.",
        "En SQL, selecciona el dialecto de la consulta y revisa la salida. Formatear no equivale a validar ni ejecutar código: prueba la consulta en el entorno adecuado antes de aplicarla a datos reales.",
        "No introduzcas secretos, tokens ni datos de clientes; usa ejemplos anonimizados. Base64 es codificación, no cifrado; comprueba la ida y vuelta al codificar URL y no uses un UUID como contraseña o autorización de acceso.",
      ],
    },
  },
  financas: {
    "pt-BR": {
      title: "Compare valores com premissas explícitas",
      introduction: "A Calculadora de Porcentagem responde a aumentos, descontos e variações; o Conversor de Moedas estima equivalências com a cotação disponível; a Calculadora CLT vs PJ compara cenários de trabalho no contexto brasileiro. Um resultado só é comparável a outro quando período, base de cálculo e custos considerados são os mesmos. Anote essas premissas antes de decidir o que o número significa.",
      tips: [
        "Em porcentagens, identifique a base: passar de 100 para 120 é um aumento de 20%, mas voltar de 120 para 100 não é um desconto de 20%. Use a operação adequada para cada direção.",
        "No Conversor de Moedas, confira o par de moedas e a data da cotação apresentada. Compare a estimativa com o valor efetivamente oferecido pelo prestador, incluindo taxas, tributos e spread quando existirem.",
        "Na comparação CLT vs PJ, confira benefícios, custos e períodos das propostas, além das premissas brasileiras da ferramenta. Os resultados são apoio de cálculo, não orientação financeira, tributária ou jurídica; confirme as condições aplicáveis antes de decidir.",
      ],
    },
    en: {
      title: "Compare amounts with explicit assumptions",
      introduction: "Percentage Calculator handles increases, discounts, and changes; Currency Converter estimates equivalents using the available rate; CLT vs Freelance Calculator compares employment scenarios in the Brazilian context. Two results are comparable only when their period, calculation base, and included costs match. Record those assumptions before deciding what the number means.",
      tips: [
        "Identify the percentage base: moving from 100 to 120 is a 20% increase, but returning from 120 to 100 is not a 20% discount. Choose the operation that matches each direction.",
        "In Currency Converter, check the currency pair and the displayed rate date. Compare the estimate with the provider's actual offer, including fees, taxes, and exchange spreads where applicable.",
        "For CLT vs freelance comparisons, check benefits, costs, proposal periods, and the tool's Brazilian assumptions. Results support calculations and are not financial, tax, or legal advice; confirm the applicable conditions before deciding.",
      ],
    },
    es: {
      title: "Compara importes con supuestos explícitos",
      introduction: "La Calculadora de porcentajes resuelve aumentos, descuentos y variaciones; el Convertidor de moneda estima equivalencias con la cotización disponible; la Calculadora CLT vs autónomo compara escenarios laborales en el contexto brasileño. Dos resultados son comparables cuando coinciden período, base de cálculo y costos incluidos. Anota esos supuestos antes de interpretar el número.",
      tips: [
        "Identifica la base del porcentaje: pasar de 100 a 120 es un aumento del 20%, pero volver de 120 a 100 no es un descuento del 20%. Elige la operación adecuada para cada dirección.",
        "En el Convertidor de moneda, comprueba el par de monedas y la fecha de la cotización mostrada. Compara la estimación con la oferta real del proveedor, incluidas comisiones, impuestos y diferencial de cambio cuando correspondan.",
        "Para comparar CLT y trabajo autónomo, revisa beneficios, costos, períodos y los supuestos brasileños de la herramienta. Los resultados apoyan el cálculo y no son asesoramiento financiero, tributario ni jurídico; confirma las condiciones aplicables antes de decidir.",
      ],
    },
  },
  seguranca: {
    "pt-BR": {
      title: "Transforme uma senha gerada em proteção de conta",
      introduction: "O Gerador de Senhas cria uma credencial aleatória, mas a proteção depende também de onde ela será usada e guardada. Defina os requisitos do serviço antes de gerar: comprimento permitido e caracteres aceitos. Uma senha adequada perde parte de sua utilidade quando é reutilizada em outras contas ou armazenada em um lugar exposto.",
      tips: [
        "Ajuste comprimento e grupos de caracteres às regras do serviço. Se ele rejeitar a senha, gere outra com as opções aceitas em vez de encurtar manualmente a mesma sequência.",
        "Use uma senha única para cada conta e guarde-a em um gerenciador de senhas. Não reutilize uma credencial gerada em vários serviços nem envie a senha por uma conversa para guardá-la.",
        "Ative a autenticação em dois fatores quando disponível e guarde os códigos de recuperação em local seguro. Gerar uma nova senha aqui não altera a senha da sua conta: conclua a troca no próprio serviço.",
      ],
    },
    en: {
      title: "Turn a generated password into account protection",
      introduction: "Password Generator creates a random credential, but protection also depends on where you use and store it. Check the service's requirements before generating a password, including allowed length and accepted characters. An appropriate password loses some of its value when reused across accounts or stored somewhere exposed.",
      tips: [
        "Set length and character groups to match the service's rules. If it rejects the password, generate another with accepted options instead of manually shortening the same sequence.",
        "Use a unique password for each account and store it in a password manager. Do not reuse a generated credential across services or send it in a conversation as a way to save it.",
        "Enable two-factor authentication where available and keep recovery codes in a safe place. Generating a password here does not change your account password: complete the change within the service itself.",
      ],
    },
    es: {
      title: "Convierte una contraseña generada en protección de cuenta",
      introduction: "El Generador de contraseñas crea una credencial aleatoria, pero la protección también depende de dónde se utilice y guarde. Comprueba los requisitos del servicio antes de generarla, incluidos longitud y caracteres admitidos. Una contraseña adecuada pierde parte de su utilidad si se reutiliza en otras cuentas o se almacena en un lugar expuesto.",
      tips: [
        "Ajusta longitud y grupos de caracteres a las reglas del servicio. Si rechaza la contraseña, genera otra con las opciones admitidas en lugar de acortar manualmente la misma secuencia.",
        "Usa una contraseña única para cada cuenta y guárdala en un gestor de contraseñas. No reutilices una credencial generada en varios servicios ni la envíes en una conversación para conservarla.",
        "Activa la autenticación de dos factores cuando esté disponible y guarda los códigos de recuperación en un lugar seguro. Generar una contraseña aquí no cambia la de tu cuenta: completa el cambio en el propio servicio.",
      ],
    },
  },
  texto: {
    "pt-BR": {
      title: "Revise extensão, diferenças e apresentação do texto",
      introduction: "O Contador de Palavras mede a extensão de um rascunho; o Comparador de Texto mostra mudanças entre versões; o Conversor de Maiúsculas e Minúsculas ajusta a caixa das letras. O Gerador de Letras Diferentes usa caracteres Unicode para estilizar trechos. Essas operações ajudam na preparação, mas não substituem a leitura do texto no contexto em que será publicado.",
      tips: [
        "No Contador de Palavras, escolha a métrica exigida pelo destino: palavras ou caracteres, com ou sem espaços. Tempo de leitura é estimativa; confira o limite novamente depois da edição final.",
        "No Comparador de Texto, mantenha a versão original de um lado e a revisada do outro. Analise as diferenças para confirmar inclusões e remoções; a ferramenta não decide se uma mudança melhora o sentido.",
        "Após converter a caixa, revise siglas e nomes próprios. Use letras Unicode com moderação e teste a cópia no destino: são caracteres diferentes, não uma fonte instalada, e podem dificultar busca, leitura e acessibilidade.",
      ],
    },
    en: {
      title: "Review text length, changes, and presentation",
      introduction: "Word Counter measures a draft's length; Text Comparator shows changes between versions; Case Converter adjusts letter case. Font Generator uses Unicode characters to style short passages. These operations help prepare writing, but they do not replace reading the text in the context where it will be published.",
      tips: [
        "In Word Counter, choose the destination's required metric: words or characters, with or without spaces. Reading time is an estimate; check the limit again after your final edit.",
        "In Text Comparator, keep the original version on one side and the revision on the other. Review differences to confirm additions and deletions; the tool does not decide whether a change improves meaning.",
        "After changing case, review acronyms and proper names. Use Unicode lettering sparingly and test pasting at the destination: these are different characters, not an installed font, and can make searching, reading, and accessibility harder.",
      ],
    },
    es: {
      title: "Revisa extensión, cambios y presentación del texto",
      introduction: "El Contador de palabras mide la extensión de un borrador; el Comparador de texto muestra cambios entre versiones; el Convertidor de Mayúsculas y Minúsculas ajusta la caja de las letras. El Generador de Letras Bonitas utiliza caracteres Unicode para estilizar fragmentos. Estas operaciones ayudan a preparar la escritura, pero no sustituyen leer el texto en su contexto de publicación.",
      tips: [
        "En el Contador de palabras, elige la métrica exigida por el destino: palabras o caracteres, con o sin espacios. El tiempo de lectura es una estimación; comprueba el límite tras la edición final.",
        "En el Comparador de texto, coloca el original a un lado y la revisión al otro. Examina las diferencias para confirmar adiciones y eliminaciones; la herramienta no decide si un cambio mejora el sentido.",
        "Tras convertir la caja, revisa siglas y nombres propios. Usa letras Unicode con moderación y prueba pegarlas en el destino: son caracteres distintos, no una fuente instalada, y pueden dificultar búsqueda, lectura y accesibilidad.",
      ],
    },
  },
  utilidades: {
    "pt-BR": {
      title: "Teste códigos e prepare escolhas aleatórias",
      introduction: "Gerador e Leitor de QR Code conectam um conteúdo à sua representação visual; o Gerador de Código de Barras prepara imagens para leitura por um sistema compatível. A Roleta de Nomes permite escolher entre opções em atividades informais. O resultado na tela é apenas uma etapa: o código precisa funcionar no tamanho e suporte finais, e a lista da roleta precisa representar as opções pretendidas.",
      tips: [
        "Depois de gerar um QR, leia a imagem exportada com o Leitor de QR Code e confira o texto ou endereço. Teste também no tamanho de impressão; ao ler um QR desconhecido, revise o destino antes de abrir o link.",
        "No código de barras, escolha o formato aceito pelo sistema de destino e confira os dados. Teste a imagem exportada com o leitor que será usado, preservando contraste e margens; gerar a imagem não registra um produto.",
        "Na Roleta de Nomes, revise duplicatas e opções antes de girar, pois entradas repetidas podem mudar as chances. Teste a configuração e confira a seleção exibida; use-a para escolhas informais, não para sorteios regulamentados.",
      ],
    },
    en: {
      title: "Test codes and prepare random choices",
      introduction: "QR Code Generator and QR Code Scanner connect content with its visual representation; Barcode Generator prepares images for a compatible reading system. Wheel of Names selects options for informal activities. The on-screen result is only one step: a code must work at its final size and on its final medium, and the wheel's list must represent the intended choices.",
      tips: [
        "After generating a QR code, read the exported image with QR Code Scanner and check its text or address. Test at the intended print size too; when reading an unfamiliar QR code, inspect the destination before opening the link.",
        "For a barcode, choose a format accepted by the destination system and check the data. Test the exported image with the actual reader, preserving contrast and margins; generating an image does not register a product.",
        "In Wheel of Names, review duplicate entries and options before spinning, since repeated entries can change the odds. Test the setup and check the displayed selection; use it for informal choices, not regulated prize draws.",
      ],
    },
    es: {
      title: "Prueba códigos y prepara elecciones aleatorias",
      introduction: "El Generador y el Escáner de código QR conectan un contenido con su representación visual; el Generador de Código de Barras prepara imágenes para un sistema de lectura compatible. La Ruleta de Nombres elige opciones para actividades informales. El resultado en pantalla es solo una etapa: el código debe funcionar en su tamaño y soporte finales, y la lista de la ruleta debe representar las opciones previstas.",
      tips: [
        "Después de generar un QR, lee la imagen exportada con el Escáner de código QR y comprueba el texto o la dirección. Prueba también el tamaño de impresión; al leer un QR desconocido, revisa el destino antes de abrir el enlace.",
        "Para un código de barras, elige un formato admitido por el sistema de destino y comprueba los datos. Prueba la imagen exportada con el lector real, conservando contraste y márgenes; generar la imagen no registra un producto.",
        "En la Ruleta de Nombres, revisa duplicados y opciones antes de girar, pues las entradas repetidas pueden cambiar las probabilidades. Prueba la configuración y comprueba la selección mostrada; úsala para elecciones informales, no para sorteos regulados.",
      ],
    },
  },
};

import type { Locale } from "./locales";
import type { GuideKey } from "./guide-routes";

export type GuideContent = {
  title: string;
  summary: string;
  introduction: string[];
  steps: { title: string; paragraphs: string[] }[];
  examples: { title: string; input: string; result: string; explanation: string }[];
  mistakes: string[];
  tools: { toolId: string; purpose: string }[];
  faq: { question: string; answer: string }[];
  relatedGuides: GuideKey[];
};

export const guideCopy = {
  en: {
    name: "Guides", title: "Practical guides for files and developer data",
    intro: "Start with the result you need, then choose the tool. These guides explain how to prepare web images, organize PDFs, and inspect developer data, with examples and checks before you use the output.",
    link: "Explore practical guides", prompt: "Not sure which tool to use? Follow a workflow for images, PDFs, or developer data.",
    workflow: "A practical decision workflow", examples: "Worked examples", input: "Starting point", result: "Expected result", mistakes: "Common mistakes and real limitations", tools: "When to use each tool", faq: "Questions about this workflow", related: "Continue with a related guide", home: "Home", breadcrumb: "Breadcrumb",
  },
  "pt-BR": {
    name: "Guias", title: "Guias práticos para arquivos e dados de desenvolvimento",
    intro: "Comece pelo resultado desejado e escolha a ferramenta adequada. Os guias explicam como preparar imagens para a web, organizar PDFs e inspecionar dados de desenvolvimento, com exemplos e conferências antes de usar o resultado.",
    link: "Explorar guias práticos", prompt: "Está em dúvida sobre qual ferramenta usar? Siga um fluxo para imagens, PDFs ou dados de desenvolvimento.",
    workflow: "Um fluxo prático de decisão", examples: "Exemplos aplicados", input: "Ponto de partida", result: "Resultado esperado", mistakes: "Erros comuns e limitações reais", tools: "Quando usar qual ferramenta", faq: "Dúvidas sobre este fluxo", related: "Continue com um guia relacionado", home: "Início", breadcrumb: "Trilha de navegação",
  },
  es: {
    name: "Guías", title: "Guías prácticas para archivos y datos de desarrollo",
    intro: "Empieza por el resultado que necesitas y elige la herramienta adecuada. Estas guías explican cómo preparar imágenes para la web, organizar PDF e inspeccionar datos de desarrollo, con ejemplos y comprobaciones antes de utilizar la salida.",
    link: "Explorar guías prácticas", prompt: "¿No sabes qué herramienta elegir? Sigue un flujo para imágenes, PDF o datos de desarrollo.",
    workflow: "Un flujo práctico de decisión", examples: "Ejemplos aplicados", input: "Punto de partida", result: "Resultado esperado", mistakes: "Errores comunes y limitaciones reales", tools: "Cuándo usar cada herramienta", faq: "Preguntas sobre este flujo", related: "Continúa con una guía relacionada", home: "Inicio", breadcrumb: "Ruta de navegación",
  },
} satisfies Record<Locale, Record<string, string>>;

export const guideContent: Record<GuideKey, Record<Locale, GuideContent>> = {
  images: {
    en: {
      title: "Prepare images for the web without unnecessary exports",
      summary: "Choose dimensions, format, and compression for a web image, then check the exported file before uploading it.",
      introduction: [
        "This workflow is for anyone uploading a photo, screenshot, or logo to a website or form that specifies image dimensions, accepted formats, or a file size limit. Those are three separate requirements: changing an extension does not resize the picture, and a smaller pixel count does not guarantee a particular file size.",
        "Keep the original in a separate folder and note the destination's rules before editing. USEVO's image tools work with JPG, PNG, and WebP. Use only the steps your destination requires; repeated exports can lose detail without bringing you closer to the upload requirements.",
      ],
      steps: [
        { title: "1. Decide whether the destination needs an image or a document", paragraphs: ["A web page usually needs an image file. A document submission may instead require a PDF containing your pictures. For that second task, JPG to PDF creates a page for each selected image; it is not an image optimization step. Check the requested output before changing anything."] },
        { title: "2. Set the final dimensions before chasing file size", paragraphs: ["If the picture is larger than needed, open Image Resizer and set a width, height, or percentage. Keep aspect ratio enabled when you want the whole picture without distortion. The resizer also offers output formats, so you may be able to resize and select the required format in a single export.", "If you only need a format change, use Image Converter instead. Choose JPG for an output without transparency, or PNG/WebP when transparency is required and the destination accepts it. Check the background before converting a transparent picture to JPG."] },
        { title: "3. Compress only the version you intend to upload", paragraphs: ["Measure the resized or converted file. If it still exceeds the destination's limit, use Compress Image and compare the reported original and final sizes. Adjust quality while checking text and edges; a quality setting is not a promise of a specific number of kilobytes. The compressor accepts files up to 10 MB and may report that no effective reduction was achieved."] },
        { title: "4. Inspect the exported file at its intended size", paragraphs: ["Download and reopen the actual output, not just the input preview. Check dimensions, orientation, transparency, fine text, and visible compression artifacts. Upload a test copy if the destination has its own preview. For another attempt, return to the saved original rather than recompressing an already degraded version."] },
      ],
      examples: [
        { title: "A landscape photo for a 1200-pixel slot", input: "A 2400 × 1600 JPG; the destination asks for 1200 pixels in width and at most 500 KB.", result: "With aspect ratio kept, resizing to 1200 pixels produces 1200 × 800 pixels. The final byte size must still be measured.", explanation: "Export from Image Resizer first. If that file exceeds 500 KB, try Compress Image and inspect the downloaded photo. Do not claim a fixed reduction: scene detail and the source encoding affect the result." },
        { title: "A transparent logo versus a document attachment", input: "A PNG logo for a website, or several JPG receipts for a PDF-only form.", result: "Keep a transparency-capable image for the logo; create a PDF with one page per receipt for the form.", explanation: "The logo should not pass through JPG if its transparent background matters. For the receipts, select them in the intended order and check every generated PDF page; a PDF is a different deliverable, not a smaller website image." },
      ],
      mistakes: [
        "Renaming .png to .jpg does not convert the file. Image Converter checks file contents and rejects incompatible or mismatched inputs; it does not accept HEIC, SVG, or GIF as supported conversion inputs.",
        "Reducing width and height is not cropping. Turning off aspect ratio can stretch the image; enlarging a small source does not recreate missing detail.",
        "Conversion is not necessarily compression. The converter rejects an output format identical to the source and enforces source size and dimension limits; use the compressor for a same-format size task.",
        "Browser decoding and export can fail for a damaged or oversized picture. These tools are not archival editors: keep originals if metadata, exact colors, or later high-quality edits matter.",
      ],
      tools: [
        { toolId: "converter-imagem", purpose: "Change between supported JPG, PNG, and WebP formats when dimensions already fit." },
        { toolId: "redimensionar-imagem", purpose: "Set width, height, or percentage and choose an output format for the final dimensions." },
        { toolId: "comprimir-imagem", purpose: "Try reducing the byte size of the prepared image and compare the actual size and quality." },
        { toolId: "jpg-para-pdf", purpose: "Place selected images on PDF pages when the recipient requires a document." },
      ],
      faq: [
        { question: "Must I convert, resize, and compress every image?", answer: "No. If dimensions and format already fit, try compression only when the byte size is too large. If resizing can also export the required format, avoid a separate conversion. Keep compression near the end so you assess the actual version you will upload." },
        { question: "Will JPG preserve a transparent background?", answer: "No. JPG does not support transparency; review the background used during export. Choose a supported PNG or WebP output if transparency is needed, and check that the destination accepts that format." },
        { question: "Why is the result still larger than the upload limit?", answer: "File size depends on dimensions, format, detail, and encoding. Compare the actual output; reduce dimensions further if the destination allows it, or adjust compression and check readability. There is no guaranteed reduction for every image." },
      ],
      relatedGuides: ["pdfs", "developer-data"],
    },
    "pt-BR": {
      title: "Prepare imagens para a web sem exportações desnecessárias",
      summary: "Escolha dimensões, formato e compressão para uma imagem e revise o arquivo exportado antes do upload.",
      introduction: [
        "Este fluxo serve para quem precisa enviar uma foto, captura de tela ou logotipo a um site ou formulário com exigências de dimensões, formato ou tamanho do arquivo. São três requisitos diferentes: mudar a extensão não redimensiona a imagem, e ter menos pixels não garante um peso específico.",
        "Guarde o original em uma pasta separada e anote as regras do destino antes de editar. As ferramentas de imagem da USEVO trabalham com JPG, PNG e WebP. Faça apenas as etapas necessárias: exportações repetidas podem perder detalhes sem resolver a exigência do envio.",
      ],
      steps: [
        { title: "1. Defina se o destino pede uma imagem ou um documento", paragraphs: ["Uma página da web geralmente precisa de um arquivo de imagem. Já um envio de documentos pode exigir um PDF com suas fotos. Nesse caso, JPG para PDF cria uma página por imagem selecionada; não é uma etapa de otimização de imagem. Confira o formato solicitado antes de começar."] },
        { title: "2. Ajuste as dimensões antes de perseguir um tamanho em bytes", paragraphs: ["Se a imagem for maior que o necessário, abra o Redimensionador de imagem e defina largura, altura ou percentual. Mantenha a proporção para preservar a imagem inteira sem distorção. O redimensionador também oferece formatos de saída, permitindo ajustar dimensões e formato em uma única exportação.", "Se só precisar trocar o formato, use o Conversor de Imagens. Escolha JPG para uma saída sem transparência, ou PNG/WebP quando ela for necessária e aceita pelo destino. Confira o fundo antes de converter uma imagem transparente para JPG."] },
        { title: "3. Comprima a versão que será enviada", paragraphs: ["Confira o peso do arquivo redimensionado ou convertido. Se ainda ultrapassar o limite, use Comprimir Imagem e compare os tamanhos original e final exibidos. Ajuste a qualidade observando letras e contornos; uma posição do controle não garante um número de kilobytes. O compressor aceita arquivos de até 10 MB e pode informar que não houve redução efetiva."] },
        { title: "4. Revise o arquivo exportado no tamanho de uso", paragraphs: ["Baixe e abra o resultado real, não apenas a prévia da entrada. Confira dimensões, orientação, transparência, textos pequenos e marcas de compressão. Faça um envio de teste se o destino oferecer prévia. Para outra tentativa, volte ao original guardado em vez de recomprimir uma versão já degradada."] },
      ],
      examples: [
        { title: "Uma foto horizontal para um espaço de 1200 pixels", input: "JPG de 2400 × 1600; o destino pede 1200 pixels de largura e no máximo 500 KB.", result: "Mantendo a proporção, a largura de 1200 gera uma imagem de 1200 × 800 pixels. O tamanho em bytes ainda precisa ser conferido.", explanation: "Exporte primeiro pelo Redimensionador de imagem. Se o arquivo superar 500 KB, experimente Comprimir Imagem e revise a foto baixada. Não presuma uma redução fixa: os detalhes da cena e a codificação original influenciam o resultado." },
        { title: "Um logotipo transparente e um anexo de documentos", input: "Um logo PNG para o site, ou vários comprovantes JPG para um formulário que só aceita PDF.", result: "Mantenha um formato de imagem com transparência para o logo; crie um PDF com uma página por comprovante para o formulário.", explanation: "O logo não deve passar por JPG se o fundo transparente for importante. Para os comprovantes, selecione as imagens na ordem desejada e confira cada página gerada; PDF é outra entrega, não uma imagem menor para a web." },
      ],
      mistakes: [
        "Renomear .png para .jpg não converte o conteúdo. O Conversor de Imagens confere os bytes e rejeita entradas incompatíveis ou divergentes; HEIC, SVG e GIF não são formatos de entrada suportados nessa conversão.",
        "Diminuir largura e altura não recorta a imagem. Desativar a proporção pode esticar o conteúdo; ampliar uma imagem pequena não recupera detalhes ausentes.",
        "Converter não significa comprimir. O conversor rejeita uma saída igual ao formato de origem e impõe limites de tamanho e dimensões; para reduzir peso mantendo o formato, use o compressor.",
        "A leitura e a exportação no navegador podem falhar com arquivos danificados ou grandes. As ferramentas não são editores de preservação: mantenha os originais se metadados, cores exatas ou futuras edições de qualidade forem importantes.",
      ],
      tools: [
        { toolId: "converter-imagem", purpose: "Troque entre JPG, PNG e WebP suportados quando as dimensões já estiverem adequadas." },
        { toolId: "redimensionar-imagem", purpose: "Defina largura, altura ou percentual e escolha o formato para as dimensões finais." },
        { toolId: "comprimir-imagem", purpose: "Tente reduzir o peso da imagem preparada e compare tamanho e qualidade reais." },
        { toolId: "jpg-para-pdf", purpose: "Coloque imagens selecionadas em páginas de PDF quando o destinatário exigir um documento." },
      ],
      faq: [
        { question: "Preciso converter, redimensionar e comprimir toda imagem?", answer: "Não. Se dimensões e formato já atenderem ao destino, tente comprimir apenas se o peso for excessivo. Se o redimensionador puder exportar no formato necessário, evite uma conversão separada. Deixe a compressão perto do final para avaliar a versão que será enviada." },
        { question: "JPG mantém o fundo transparente?", answer: "Não. JPG não suporta transparência; revise o fundo aplicado na exportação. Escolha uma saída PNG ou WebP suportada se precisar de transparência e confira se o destino aceita esse formato." },
        { question: "Por que o resultado ainda supera o limite do upload?", answer: "O peso depende de dimensões, formato, detalhes e codificação. Compare o arquivo real; reduza mais as dimensões se o destino permitir, ou ajuste a compressão e confira a legibilidade. Não existe uma redução garantida para toda imagem." },
      ],
      relatedGuides: ["pdfs", "developer-data"],
    },
    es: {
      title: "Prepara imágenes para la web sin exportaciones innecesarias",
      summary: "Elige dimensiones, formato y compresión para una imagen y revisa el archivo exportado antes de subirlo.",
      introduction: [
        "Este flujo sirve para subir una foto, captura de pantalla o logotipo a un sitio o formulario que exige dimensiones, formatos o un límite de peso. Son tres requisitos distintos: cambiar la extensión no redimensiona la imagen y reducir los píxeles no garantiza un tamaño concreto en bytes.",
        "Guarda el original en una carpeta aparte y anota las reglas del destino antes de editar. Las herramientas de imagen de USEVO trabajan con JPG, PNG y WebP. Aplica solo los pasos necesarios: exportar repetidamente puede perder detalles sin resolver las exigencias de la subida.",
      ],
      steps: [
        { title: "1. Decide si necesitas una imagen o un documento", paragraphs: ["Una página web suele necesitar un archivo de imagen. Un envío documental puede exigir un PDF con las fotos. Para ese caso, JPG a PDF crea una página por cada imagen seleccionada; no es un paso de optimización de imágenes. Comprueba primero el formato solicitado."] },
        { title: "2. Ajusta las dimensiones antes de buscar un peso concreto", paragraphs: ["Si la imagen es más grande de lo necesario, abre el Redimensionador de imagen y define ancho, alto o porcentaje. Mantén la proporción para conservar la imagen completa sin deformarla. El redimensionador también ofrece formatos de salida, por lo que puedes ajustar dimensiones y formato en una sola exportación.", "Si solo necesitas otro formato, utiliza el Convertidor de imágenes. Elige JPG para una salida sin transparencia, o PNG/WebP si necesitas transparencia y el destino los admite. Comprueba el fondo antes de convertir una imagen transparente a JPG."] },
        { title: "3. Comprime la versión que vas a subir", paragraphs: ["Comprueba el peso del archivo redimensionado o convertido. Si aún supera el límite, utiliza Comprimir imagen y compara los tamaños original y final indicados. Ajusta la calidad observando letras y bordes; una posición del control no garantiza un número de kilobytes. El compresor acepta archivos de hasta 10 MB y puede indicar que no hubo reducción efectiva."] },
        { title: "4. Revisa la salida al tamaño de uso", paragraphs: ["Descarga y abre el resultado real, no solo la vista previa de la entrada. Comprueba dimensiones, orientación, transparencia, texto pequeño y marcas de compresión. Haz una subida de prueba si el destino ofrece vista previa. Para otro intento, vuelve al original guardado en lugar de recomprimir una versión ya degradada."] },
      ],
      examples: [
        { title: "Una foto horizontal para un espacio de 1200 píxeles", input: "JPG de 2400 × 1600; el destino exige 1200 píxeles de ancho y un máximo de 500 KB.", result: "Con la proporción mantenida, un ancho de 1200 produce 1200 × 800 píxeles. Todavía hay que medir el tamaño en bytes.", explanation: "Exporta primero con el Redimensionador de imagen. Si supera 500 KB, prueba Comprimir imagen y revisa la foto descargada. No supongas una reducción fija: los detalles de la escena y la codificación inicial influyen en el resultado." },
        { title: "Un logotipo transparente y un adjunto documental", input: "Un logo PNG para una web, o varios comprobantes JPG para un formulario que solo admite PDF.", result: "Conserva un formato con transparencia para el logo; crea un PDF con una página por comprobante para el formulario.", explanation: "El logo no debería pasar por JPG si importa su fondo transparente. Para los comprobantes, selecciona las imágenes en el orden previsto y revisa cada página generada; PDF es otra entrega, no una imagen web más pequeña." },
      ],
      mistakes: [
        "Cambiar .png por .jpg en el nombre no convierte el contenido. El Convertidor de imágenes comprueba los bytes y rechaza entradas incompatibles o discordantes; HEIC, SVG y GIF no son entradas admitidas en esa conversión.",
        "Reducir ancho y alto no recorta la imagen. Desactivar la proporción puede deformarla; ampliar una imagen pequeña no recupera detalles ausentes.",
        "Convertir no significa comprimir. El convertidor rechaza una salida con el mismo formato que el original e impone límites de peso y dimensiones; para reducir peso sin cambiar formato, usa el compresor.",
        "La lectura y exportación en el navegador pueden fallar con archivos dañados o grandes. Estas herramientas no son editores de conservación: guarda los originales si importan metadatos, colores exactos o futuras ediciones de calidad.",
      ],
      tools: [
        { toolId: "converter-imagem", purpose: "Cambia entre JPG, PNG y WebP admitidos cuando las dimensiones ya son adecuadas." },
        { toolId: "redimensionar-imagem", purpose: "Define ancho, alto o porcentaje y elige el formato para las dimensiones finales." },
        { toolId: "comprimir-imagem", purpose: "Intenta reducir el peso de la imagen preparada y compara tamaño y calidad reales." },
        { toolId: "jpg-para-pdf", purpose: "Coloca imágenes seleccionadas en páginas PDF cuando el destinatario exija un documento." },
      ],
      faq: [
        { question: "¿Debo convertir, redimensionar y comprimir todas las imágenes?", answer: "No. Si dimensiones y formato ya cumplen los requisitos, intenta comprimir solo si el peso es excesivo. Si el redimensionador exporta en el formato necesario, evita otra conversión. Deja la compresión cerca del final para evaluar la versión que subirás." },
        { question: "¿JPG conserva un fondo transparente?", answer: "No. JPG no admite transparencia; revisa el fondo aplicado al exportar. Elige una salida PNG o WebP admitida si necesitas transparencia y comprueba que el destino acepta ese formato." },
        { question: "¿Por qué el resultado todavía supera el límite?", answer: "El peso depende de dimensiones, formato, detalles y codificación. Compara el archivo real; reduce más las dimensiones si el destino lo permite o ajusta la compresión y revisa la legibilidad. No existe una reducción garantizada para todas las imágenes." },
      ],
      relatedGuides: ["pdfs", "developer-data"],
    },
  },
  pdfs: {
    en: {
      title: "Work with PDFs online: assemble, extract, and review",
      summary: "Choose the PDF operation for your submission, preserve the source, and check page order and exported results.",
      introduction: [
        "This guide is for preparing receipts, application attachments, or a selected section of a larger document. Before choosing a tool, write down the recipient's request: one PDF, specific pages, a smaller file, or image copies. Those outputs need different operations, and converting everything to images can remove useful document behavior.",
        "Keep every original and work on copies. Browser tools depend on file structure, size, and the memory available on your device. A PDF that opens in a viewer may still fail during processing; these tools do not provide a workflow for unlocking password-protected documents or repairing damaged files.",
      ],
      steps: [
        { title: "1. Identify the starting material and required output", paragraphs: ["If you have pictures but need a PDF, use JPG to PDF: selected images become separate pages. If you already have PDFs, decide whether to combine whole documents or extract only relevant pages. Use PDF to JPG only when the recipient actually needs image files; it renders pages rather than extracting editable text."] },
        { title: "2. Assemble the necessary pages in the right order", paragraphs: ["For multiple PDFs, add them to Merge PDF and use its up/down controls to set file order. It copies each document's pages in that order. To send a section of one PDF, use Split PDF and specify page numbers or ranges. Use positions in the loaded document, which can differ from printed page labels.", "If a document contains unrelated attachments, extract the required pages before combining them with another file. Reopen the extracted copy first, so missing or repeated pages are caught before the final assembly."] },
        { title: "3. Test compression after deciding the document contents", paragraphs: ["If the completed PDF exceeds an upload limit, try Compress PDF and compare the reported sizes. It rebuilds a document from copied pages; it does not offer a scanned-image quality slider or guarantee a smaller output. An already optimized or image-heavy PDF may show no effective reduction. Do not replace the original with a larger or unreviewed result."] },
        { title: "4. Export images only when images are the deliverable", paragraphs: ["PDF to JPG lets you select all pages or a range and choose low, medium, or high quality. Its input limit is 20 MB; low/medium allow up to 30 selected pages, high up to 15. Download and inspect each JPG. Text becomes pixels, so search, selectable text, and interactive document features do not carry over as working features."] },
        { title: "5. Reopen the exact file you will submit", paragraphs: ["Count pages and check first/last pages, order, orientation, small text, and missing content. If the original has forms, links, bookmarks, or signatures, verify those separately: page copying is not a promise to preserve document-level behavior or signature validity. Try the recipient's upload preview when available."] },
      ],
      examples: [
        { title: "Send only pages 2 to 4 of a 12-page attachment", input: "A 12-page PDF, with three relevant pages at positions 2, 3, and 4.", result: "Split PDF in extraction mode with 2-4 produces a PDF containing those three pages.", explanation: "Check the extracted pages rather than relying on a printed page number. If a cover sheet shifts the labels, document position 2 may not be the page printed as 2. Keep the 12-page source for another request." },
        { title: "Combine two receipts and a covering document", input: "Two JPG receipt images and a separate PDF cover document.", result: "Create the receipt PDF first, then combine that PDF with the cover in the intended file order.", explanation: "JPG to PDF creates one page per selected picture in selection order; it does not add the existing cover PDF. Merge PDF handles that second step. Review the combined page count and do not assume compression will meet a particular upload limit." },
      ],
      mistakes: [
        "Using PDF to JPG to make a searchable PDF smaller changes the deliverable. It renders pages to images and does not perform OCR; returning those images to PDF does not restore selectable text.",
        "Repeatedly compressing a PDF is not a reliable route to a target size. The current compressor rebuilds pages without a user-selected image recompression level; compare actual bytes and stop if there is no gain.",
        "A supported extension does not guarantee compatibility. Encrypted, damaged, or unusually complex files can fail; large documents can exceed memory or tool-specific limits even on a recent browser.",
        "Do not treat extraction as secure redaction or assume that copied pages preserve every form, bookmark, or signature. Check the exported file and use an appropriate document workflow when those properties are required.",
      ],
      tools: [
        { toolId: "jpg-para-pdf", purpose: "Create a PDF when your source material is a set of supported images." },
        { toolId: "comprimir-pdf", purpose: "Try reducing the size of a finished PDF; confirm that the result is actually smaller." },
        { toolId: "juntar-pdf", purpose: "Combine whole PDF documents and arrange their file order before export." },
        { toolId: "dividir-pdf", purpose: "Extract selected pages or create separate PDFs from page groups." },
        { toolId: "pdf-para-jpg", purpose: "Render selected PDF pages as JPG images for an image-based destination." },
      ],
      faq: [
        { question: "Can I force a PDF below a specific size?", answer: "There is no target-size guarantee. Try compression and compare the output. If the recipient permits a shorter document, extract only the required pages; do not remove required content or repeatedly convert formats just to reduce the number of bytes." },
        { question: "Can these tools unlock a protected PDF?", answer: "They do not offer a password-entry or unlocking workflow. Processing may fail for protected files. Obtain an authorized, compatible copy from the document owner and keep the source rather than assuming that changing tools will remove the restriction." },
        { question: "Do I need to check a merged PDF if every source opens?", answer: "Yes. Open the actual merged download, count the pages, and verify order and document features that matter. Viewing each source successfully does not prove the combined export has everything the recipient expects." },
      ],
      relatedGuides: ["images", "developer-data"],
    },
    "pt-BR": {
      title: "Trabalhe com PDFs online: organize, extraia e revise",
      summary: "Escolha a operação para seu envio, preserve o original e confira a ordem das páginas e o resultado exportado.",
      introduction: [
        "Este guia ajuda a preparar comprovantes, anexos de inscrição ou um trecho de um documento maior. Antes de escolher a ferramenta, anote o pedido do destinatário: um único PDF, páginas específicas, um arquivo menor ou cópias em imagem. Cada resultado exige uma operação diferente; transformar tudo em imagens pode eliminar comportamentos úteis do documento.",
        "Guarde os originais e trabalhe com cópias. Ferramentas no navegador dependem da estrutura e do tamanho do arquivo, além da memória disponível no dispositivo. Um PDF que abre em um visualizador ainda pode falhar no processamento; estas ferramentas não oferecem um fluxo para desbloquear documentos com senha ou reparar arquivos danificados.",
      ],
      steps: [
        { title: "1. Identifique a origem e o resultado exigido", paragraphs: ["Se você tem imagens e precisa de PDF, use JPG para PDF: cada imagem selecionada vira uma página. Se já tem PDFs, decida entre reunir documentos inteiros ou extrair apenas páginas relevantes. Use PDF para JPG somente quando o destinatário pedir imagens; ele renderiza páginas, não extrai texto editável."] },
        { title: "2. Organize as páginas necessárias na ordem correta", paragraphs: ["Para vários PDFs, adicione-os em Juntar PDF e use os controles de subir/descer para definir a ordem dos arquivos. A ferramenta copia as páginas de cada documento nessa sequência. Para enviar um trecho de um PDF, use Dividir PDF e informe números ou intervalos. Use as posições no documento carregado, que podem diferir da numeração impressa.", "Se o documento contiver anexos sem relação com o envio, extraia primeiro as páginas necessárias antes de juntar com outro arquivo. Abra a cópia extraída para detectar páginas ausentes ou repetidas antes da montagem final."] },
        { title: "3. Tente comprimir depois de definir o conteúdo", paragraphs: ["Se o PDF pronto ultrapassar o limite de upload, experimente Comprimir PDF e compare os tamanhos exibidos. A ferramenta reconstrói o documento copiando páginas; não oferece controle de qualidade das imagens digitalizadas nem garante uma saída menor. Um PDF já otimizado ou carregado de imagens pode não ter redução efetiva. Não substitua o original por um resultado maior ou sem revisão."] },
        { title: "4. Exporte imagens apenas quando essa for a entrega", paragraphs: ["PDF para JPG permite todas as páginas ou um intervalo, com qualidade baixa, média ou alta. A entrada tem limite de 20 MB; baixa/média aceitam até 30 páginas selecionadas e alta até 15. Baixe e revise cada JPG. O texto vira pixels: busca, seleção de texto e recursos interativos não permanecem como funções utilizáveis."] },
        { title: "5. Abra exatamente o arquivo que será enviado", paragraphs: ["Conte as páginas e confira começo, fim, ordem, orientação, letras pequenas e conteúdo ausente. Se o original tiver formulários, links, marcadores ou assinaturas, verifique-os separadamente: copiar páginas não promete preservar recursos do documento inteiro nem a validade das assinaturas. Use a prévia do upload do destinatário quando disponível."] },
      ],
      examples: [
        { title: "Enviar só as páginas 2 a 4 de um anexo de 12 páginas", input: "PDF de 12 páginas; as três páginas relevantes estão nas posições 2, 3 e 4.", result: "No modo de extração de Dividir PDF, o intervalo 2-4 gera um PDF com essas três páginas.", explanation: "Confira as páginas extraídas em vez de confiar apenas na numeração impressa. Uma capa pode deslocar os números: a posição 2 pode não ser a página marcada como 2. Guarde o documento de 12 páginas para outro pedido." },
        { title: "Reunir dois comprovantes e um documento de apresentação", input: "Dois comprovantes JPG e um PDF separado de apresentação.", result: "Crie primeiro o PDF dos comprovantes e depois junte esse PDF com a apresentação na ordem desejada.", explanation: "JPG para PDF cria uma página por imagem na ordem de seleção; não adiciona o PDF já existente. Juntar PDF faz essa segunda etapa. Confira a quantidade final de páginas e não presuma que a compressão atingirá um limite específico de upload." },
      ],
      mistakes: [
        "Usar PDF para JPG para reduzir um PDF pesquisável muda a entrega. A ferramenta renderiza páginas em imagens e não faz OCR; recolocar as imagens em PDF não recupera o texto selecionável.",
        "Comprimir várias vezes não é uma forma confiável de atingir um tamanho alvo. O compressor atual reconstrói páginas sem um nível de recompressão de imagens escolhido pelo usuário; compare os bytes reais e pare se não houver ganho.",
        "Uma extensão aceita não garante compatibilidade. Arquivos protegidos, danificados ou complexos podem falhar; documentos grandes podem exceder memória ou limites específicos mesmo em um navegador recente.",
        "Não trate extração como tarja segura nem presuma que páginas copiadas preservem todos os formulários, marcadores ou assinaturas. Revise a exportação e use um fluxo documental apropriado quando esses recursos forem exigidos.",
      ],
      tools: [
        { toolId: "jpg-para-pdf", purpose: "Crie um PDF quando o material de origem for um conjunto de imagens suportadas." },
        { toolId: "comprimir-pdf", purpose: "Tente reduzir o peso de um PDF pronto e confira se a saída realmente ficou menor." },
        { toolId: "juntar-pdf", purpose: "Reúna documentos PDF inteiros e organize a ordem dos arquivos antes de exportar." },
        { toolId: "dividir-pdf", purpose: "Extraia páginas selecionadas ou gere PDFs separados a partir de grupos de páginas." },
        { toolId: "pdf-para-jpg", purpose: "Renderize páginas selecionadas em JPG para um destino que peça imagens." },
      ],
      faq: [
        { question: "Consigo forçar um PDF a ficar abaixo de um tamanho específico?", answer: "Não há garantia de tamanho alvo. Tente comprimir e compare a saída. Se o destinatário permitir um documento mais curto, extraia só as páginas necessárias; não retire conteúdo obrigatório nem converta repetidamente apenas para diminuir bytes." },
        { question: "As ferramentas desbloqueiam um PDF protegido?", answer: "Elas não oferecem um fluxo de senha ou desbloqueio. O processamento pode falhar com arquivos protegidos. Obtenha uma cópia autorizada e compatível com o responsável pelo documento e preserve a origem, sem presumir que trocar de ferramenta remova a restrição." },
        { question: "Preciso revisar o PDF unido se cada original abre normalmente?", answer: "Sim. Abra o download final, conte as páginas e confira ordem e recursos relevantes. Conseguir visualizar os originais não comprova que a exportação reunida atende a tudo que o destinatário espera." },
      ],
      relatedGuides: ["images", "developer-data"],
    },
    es: {
      title: "Trabaja con PDF online: organiza, extrae y revisa",
      summary: "Elige la operación para tu envío, conserva el original y comprueba el orden de páginas y la salida exportada.",
      introduction: [
        "Esta guía ayuda a preparar comprobantes, adjuntos de solicitudes o una sección de un documento mayor. Antes de elegir una herramienta, anota qué pide el destinatario: un único PDF, páginas concretas, un archivo más pequeño o copias en imagen. Cada resultado requiere una operación distinta; convertir todo a imágenes puede eliminar funciones útiles del documento.",
        "Conserva todos los originales y trabaja con copias. Las herramientas del navegador dependen de la estructura y el tamaño del archivo, además de la memoria del dispositivo. Un PDF que se abre en un visor puede fallar al procesarlo; estas herramientas no ofrecen un flujo para desbloquear documentos con contraseña ni reparar archivos dañados.",
      ],
      steps: [
        { title: "1. Identifica el material inicial y la salida exigida", paragraphs: ["Si tienes imágenes y necesitas un PDF, usa JPG a PDF: cada imagen seleccionada se convierte en una página. Si ya tienes PDF, decide entre combinar documentos completos o extraer solo páginas relevantes. Utiliza PDF a JPG cuando el destinatario pida imágenes; renderiza páginas, no extrae texto editable."] },
        { title: "2. Ordena las páginas necesarias", paragraphs: ["Para varios PDF, añádelos a Combinar PDF y utiliza los controles de subir/bajar para definir el orden de archivos. La herramienta copia las páginas de cada documento en esa secuencia. Para enviar una sección, utiliza Dividir PDF e indica números o intervalos. Usa las posiciones del documento cargado, que pueden diferir de las etiquetas impresas.", "Si el documento contiene adjuntos ajenos al envío, extrae primero las páginas necesarias antes de combinarlas con otro archivo. Abre la copia extraída para detectar páginas ausentes o repetidas antes del montaje final."] },
        { title: "3. Prueba la compresión tras decidir el contenido", paragraphs: ["Si el PDF terminado supera el límite de subida, prueba Comprimir PDF y compara los tamaños mostrados. Reconstruye el documento copiando páginas; no ofrece un control de calidad para imágenes escaneadas ni garantiza una salida menor. Un PDF ya optimizado o con muchas imágenes puede no reducirse. No sustituyas el original por un resultado mayor o sin revisar."] },
        { title: "4. Exporta imágenes solo si esa es la entrega", paragraphs: ["PDF a JPG permite elegir todas las páginas o un intervalo y calidad baja, media o alta. El límite de entrada es 20 MB; baja/media admiten hasta 30 páginas seleccionadas y alta hasta 15. Descarga y revisa cada JPG. El texto pasa a ser píxeles: búsqueda, selección de texto y funciones interactivas no se mantienen como funciones utilizables."] },
        { title: "5. Abre el archivo exacto que vas a enviar", paragraphs: ["Cuenta páginas y revisa inicio, final, orden, orientación, texto pequeño y contenido ausente. Si el original tiene formularios, enlaces, marcadores o firmas, compruébalos por separado: copiar páginas no promete conservar funciones del documento completo ni la validez de firmas. Utiliza la vista previa del destinatario cuando esté disponible."] },
      ],
      examples: [
        { title: "Enviar solo las páginas 2 a 4 de un adjunto de 12 páginas", input: "PDF de 12 páginas; las tres relevantes están en las posiciones 2, 3 y 4.", result: "En el modo de extracción de Dividir PDF, el intervalo 2-4 genera un PDF con esas tres páginas.", explanation: "Comprueba las páginas extraídas en lugar de confiar solo en la numeración impresa. Una portada puede desplazar las etiquetas: la posición 2 podría no ser la página marcada como 2. Conserva el documento de 12 páginas para otra solicitud." },
        { title: "Reunir dos comprobantes y un documento de presentación", input: "Dos comprobantes JPG y un PDF de presentación separado.", result: "Crea primero el PDF de comprobantes y combínalo después con la presentación en el orden previsto.", explanation: "JPG a PDF crea una página por imagen en orden de selección; no incorpora el PDF existente. Combinar PDF realiza ese segundo paso. Comprueba el número final de páginas y no supongas que la compresión alcanzará un límite concreto de subida." },
      ],
      mistakes: [
        "Utilizar PDF a JPG para reducir un PDF con texto buscable cambia la entrega. Renderiza páginas como imágenes y no realiza OCR; volver a poner esas imágenes en PDF no recupera el texto seleccionable.",
        "Comprimir repetidamente no es una vía fiable para alcanzar un tamaño objetivo. El compresor actual reconstruye páginas sin un nivel de recompresión de imágenes elegido por el usuario; compara los bytes reales y detente si no hay mejora.",
        "Una extensión admitida no garantiza compatibilidad. Archivos protegidos, dañados o complejos pueden fallar; documentos grandes pueden superar memoria o límites específicos incluso en un navegador reciente.",
        "No trates la extracción como una censura segura ni supongas que las páginas copiadas conservan todos los formularios, marcadores o firmas. Revisa la exportación y usa un flujo documental adecuado cuando esas funciones sean necesarias.",
      ],
      tools: [
        { toolId: "jpg-para-pdf", purpose: "Crea un PDF si el material de origen es un conjunto de imágenes admitidas." },
        { toolId: "comprimir-pdf", purpose: "Intenta reducir el peso de un PDF terminado y comprueba que la salida sea realmente menor." },
        { toolId: "juntar-pdf", purpose: "Combina documentos PDF completos y ordena los archivos antes de exportar." },
        { toolId: "dividir-pdf", purpose: "Extrae páginas seleccionadas o crea PDF separados a partir de grupos de páginas." },
        { toolId: "pdf-para-jpg", purpose: "Renderiza páginas seleccionadas como JPG para un destino que exija imágenes." },
      ],
      faq: [
        { question: "¿Puedo forzar que un PDF quede por debajo de cierto tamaño?", answer: "No hay garantía de tamaño objetivo. Prueba la compresión y compara la salida. Si el destinatario permite un documento más corto, extrae solo las páginas necesarias; no elimines contenido obligatorio ni conviertas repetidamente solo para reducir bytes." },
        { question: "¿Estas herramientas desbloquean PDF protegidos?", answer: "No ofrecen un flujo para introducir contraseñas o desbloquear archivos. El procesamiento puede fallar con documentos protegidos. Obtén del responsable una copia autorizada y compatible y conserva la fuente; cambiar de herramienta no garantiza quitar la restricción." },
        { question: "¿Debo revisar el PDF combinado si los originales se abren bien?", answer: "Sí. Abre la descarga final, cuenta páginas y comprueba el orden y las funciones relevantes. Ver los originales correctamente no demuestra que la exportación combinada tenga todo lo que espera el destinatario." },
      ],
      relatedGuides: ["images", "developer-data"],
    },
  },
  "developer-data": {
    en: {
      title: "Use developer data tools safely before integration",
      summary: "Inspect JSON, encode text and URL components, generate identifiers, and format SQL without mistaking preparation for production validation.",
      introduction: [
        "This workflow is for developers and technical support staff trying to understand a sample payload, an encoded value, or a query before using it in an application. First identify the representation: JSON, Base64, a URL component, and SQL need different operations. A readable output is useful for review, but it is not proof that the input is trustworthy or suitable for production.",
        "Prepare a small, anonymized example. Do not enter passwords, API keys, session tokens, connection strings, or customer records. The relevant transformations run in browser code, but that is not an absolute privacy or security guarantee for a device, browser extension, clipboard, or shared screen. Keep sensitive work in an approved environment.",
      ],
      steps: [
        { title: "1. Identify the representation before changing it", paragraphs: ["Use Base64 for text encoded as Base64 and URL Encoder / Decoder for percent-encoded URL components. Do not choose based only on what the text looks like. Check the system's specification and decode once; repeated decoding can change a literal percent sequence into a different value. Neither operation verifies the source or makes an unknown link safe."] },
        { title: "2. Check JSON syntax, then inspect the structure", paragraphs: ["JSON Formatter uses JSON.parse and JSON.stringify to format or minify. Invalid syntax, comments, and trailing commas are not repaired automatically. Keep an untouched sample because formatting replaces the field and serialization can normalize its representation.", "For nested data, use JSON Inspector to expand objects and arrays. Check where values are located, whether a value is a string or number, and whether a list has the expected shape. Syntax acceptance does not validate required fields, business rules, or the schema expected by your API."] },
        { title: "3. Separate identifiers from secrets", paragraphs: ["UUID Generator produces one v4-format identifier per action. Use it for a sample record ID when that is what the application expects; do not use it as a password or proof of permission. The current implementation uses crypto.randomUUID when available and a Math.random fallback otherwise, so it should not be described as a guaranteed security credential."] },
        { title: "4. Format SQL for review, then test elsewhere", paragraphs: ["Choose the SQL dialect that matches the query: standard SQL, PostgreSQL, MySQL, or SQLite. The formatter reorganizes text; it does not connect to a database or execute the statement. Review identifiers and conditions, then test with the intended database and an appropriate test dataset. Formatting is not production validation, an injection check, or a guarantee that a query is safe to run."] },
        { title: "5. Compare the output with the receiving system's contract", paragraphs: ["Before copying a result into code or configuration, check escaping, types, field names, and the required representation. Use a round-trip check for your small encoding sample. For JSON, retain identifiers that require exact integer precision as strings when the contract requires them; JavaScript number handling and duplicate keys can change information during parsing."] },
      ],
      examples: [
        { title: "Check a Base64 text round trip", input: "The non-sensitive text hello.", result: "Encoding returns aGVsbG8=; decoding that value returns hello.", explanation: "This tests the representation used by the text tool, not confidentiality. Anyone able to decode the value can read it. The interface handles text, not uploaded files, and malformed Base64 can produce an error." },
        { title: "A query value that contains an ampersand", input: "The component value A&B.", result: "URL encoding returns A%26B; decoding returns A&B.", explanation: "The tool uses encodeURIComponent for components. Applying it to an entire URL also encodes structural characters such as : and /. Decide which component needs encoding before rebuilding a URL, then check the receiving application." },
        { title: "Distinguish a number from a string in JSON", input: '{"count":2,"items":["pen"]}', result: "Formatting makes the structure readable; inspection shows count as a number and items as an array containing a string.", explanation: "Changing 2 to \"2\" can still produce valid JSON but a different data type. Neither tool knows whether your API accepts that change. Duplicate keys retain the last parsed value, so keep the original text for comparison." },
      ],
      mistakes: [
        "Base64 is encoding, not encryption. Encoding a password or token does not protect it and does not make it appropriate to paste into a troubleshooting tool.",
        "A formatted query has not been executed or approved for production. Review destructive operations and test in the intended environment; formatting does not enforce permissions or parameterize a query.",
        "JSON syntax validation is narrower than application validation. Duplicate keys, very large integers, and missing required fields deserve separate checks; large payloads can also make browser analysis slow.",
        "A URL decoding error may indicate malformed percent sequences, not a need to decode again. Preserve the input and verify the expected encoding with the source system rather than editing until an error disappears.",
      ],
      tools: [
        { toolId: "base64", purpose: "Encode or decode a non-sensitive text sample in Base64 and check its round trip." },
        { toolId: "formatador-de-json", purpose: "Check JSON syntax and format or minify accepted input for review." },
        { toolId: "json-inspector", purpose: "Explore nested JSON objects, arrays, and values without treating inspection as schema validation." },
        { toolId: "url-encoder-decoder", purpose: "Encode or decode URL component text and review structural characters before rebuilding a URL." },
        { toolId: "uuid-generator", purpose: "Generate a single identifier for a sample record, not a password or access token." },
        { toolId: "formatador-sql", purpose: "Organize SQL text using an available dialect before reviewing and testing the query elsewhere." },
      ],
      faq: [
        { question: "Does JSON Formatter validate anything?", answer: "Yes: JSON.parse checks whether the text is syntactically acceptable JSON. It does not validate an API schema, required fields, business rules, or production suitability. Successful formatting is the start of a data review, not its conclusion." },
        { question: "Should I encode a complete URL with this tool?", answer: "The encoding action uses encodeURIComponent, so it encodes structural separators too. Use it for the intended component value when assembling a URL. The receiving system determines whether a component is encoded once, already encoded, or expected in another form." },
        { question: "Can I paste real credentials because processing is in the browser?", answer: "Do not paste secrets or credentials. Local transformations do not rule out exposure through your device, extensions, clipboard, or screen sharing. Use anonymized samples here and an approved workflow for sensitive production data." },
      ],
      relatedGuides: ["images", "pdfs"],
    },
    "pt-BR": {
      title: "Use ferramentas de dados com segurança antes da integração",
      summary: "Inspecione JSON, codifique texto e componentes de URL, gere identificadores e formate SQL sem confundir preparação com validação de produção.",
      introduction: [
        "Este fluxo serve para desenvolvimento e suporte técnico que precisam entender um exemplo de payload, um valor codificado ou uma consulta antes de usar na aplicação. Identifique primeiro a representação: JSON, Base64, componente de URL e SQL exigem operações diferentes. Uma saída legível ajuda na revisão, mas não comprova que a entrada seja confiável ou adequada à produção.",
        "Prepare um exemplo pequeno e anonimizado. Não insira senhas, chaves de API, tokens de sessão, strings de conexão ou registros de clientes. As transformações relevantes rodam no código do navegador, mas isso não é uma garantia absoluta de privacidade ou segurança do dispositivo, das extensões, da área de transferência ou de uma tela compartilhada. Mantenha trabalho sensível em ambiente aprovado.",
      ],
      steps: [
        { title: "1. Identifique a representação antes de alterá-la", paragraphs: ["Use Base64 para texto nesse formato e o Codificador/Decodificador de URL para componentes com codificação percentual. Não escolha só pela aparência do texto. Confira a especificação do sistema e decodifique uma vez; repetições podem transformar uma sequência percentual literal em outro valor. Nenhuma dessas operações verifica a origem ou torna um link desconhecido seguro."] },
        { title: "2. Confira a sintaxe JSON e inspecione a estrutura", paragraphs: ["O Formatador de JSON usa JSON.parse e JSON.stringify para formatar ou minificar. Sintaxe inválida, comentários e vírgulas finais não são corrigidos automaticamente. Guarde uma amostra intacta: a formatação substitui o campo e a serialização pode normalizar a representação.", "Para dados aninhados, use JSON Inspector para expandir objetos e arrays. Confira onde estão os valores, se um valor é string ou número e se a lista tem a estrutura esperada. Aceitar a sintaxe não valida campos obrigatórios, regras de negócio ou o esquema exigido pela API."] },
        { title: "3. Separe identificadores de segredos", paragraphs: ["O Gerador de UUID produz um identificador no formato v4 por ação. Use-o para um ID de registro de exemplo quando a aplicação pedir isso; não como senha ou prova de permissão. A implementação usa crypto.randomUUID quando disponível e uma alternativa com Math.random nos demais casos, portanto não deve ser descrita como uma credencial de segurança garantida."] },
        { title: "4. Formate SQL para revisar e teste em outro ambiente", paragraphs: ["Escolha o dialeto da consulta: SQL padrão, PostgreSQL, MySQL ou SQLite. O formatador reorganiza o texto; não conecta ao banco nem executa a instrução. Revise identificadores e condições e depois teste no banco pretendido com dados de teste apropriados. Formatar não valida produção, não verifica injeção e não garante que a consulta seja segura para executar."] },
        { title: "5. Compare a saída com o contrato do destino", paragraphs: ["Antes de copiar para código ou configuração, confira escapes, tipos, nomes de campos e representação exigida. Faça uma verificação de ida e volta no exemplo de codificação. Em JSON, mantenha como strings os identificadores que exigem precisão inteira exata quando o contrato pedir isso; os números do JavaScript e as chaves repetidas podem alterar informações durante a análise."] },
      ],
      examples: [
        { title: "Conferir a ida e volta de texto em Base64", input: "O texto não sensível hello.", result: "Codificar retorna aGVsbG8=; decodificar esse valor retorna hello.", explanation: "Isso testa a representação usada pela ferramenta de texto, não o sigilo. Quem decodificar o valor poderá lê-lo. A interface trabalha com texto, não com upload de arquivos; Base64 malformado pode gerar um erro." },
        { title: "Um valor de parâmetro que contém ampersand", input: "O valor de componente A&B.", result: "A codificação de URL retorna A%26B; a decodificação retorna A&B.", explanation: "A ferramenta usa encodeURIComponent para componentes. Aplicá-lo a uma URL inteira também codifica caracteres estruturais, como : e /. Defina qual componente precisa de codificação antes de remontar a URL e confira a aplicação que receberá o valor." },
        { title: "Diferenciar número e string em JSON", input: '{"count":2,"items":["pen"]}', result: "Formatar torna a estrutura legível; inspecionar mostra count como número e items como array contendo uma string.", explanation: "Trocar 2 por \"2\" ainda pode gerar JSON válido, mas muda o tipo do dado. As ferramentas não sabem se a API aceita essa mudança. Chaves repetidas mantêm o último valor analisado; preserve o texto original para comparação." },
      ],
      mistakes: [
        "Base64 é codificação, não criptografia. Codificar uma senha ou token não protege o valor nem torna adequado colá-lo em uma ferramenta de diagnóstico.",
        "Uma consulta formatada não foi executada nem aprovada para produção. Revise operações destrutivas e teste no ambiente pretendido; a formatação não aplica permissões nem parametriza a consulta.",
        "Validar sintaxe JSON é mais restrito que validar a aplicação. Chaves repetidas, inteiros muito grandes e campos obrigatórios ausentes exigem outras conferências; payloads grandes também podem deixar a análise lenta no navegador.",
        "Um erro na decodificação de URL pode indicar sequências percentuais malformadas, não a necessidade de decodificar novamente. Preserve a entrada e confira a codificação esperada com o sistema de origem em vez de editar até o erro desaparecer.",
      ],
      tools: [
        { toolId: "base64", purpose: "Codifique ou decodifique uma amostra de texto não sensível em Base64 e confira a ida e volta." },
        { toolId: "formatador-de-json", purpose: "Confira a sintaxe JSON e formate ou minifique a entrada aceita para revisão." },
        { toolId: "json-inspector", purpose: "Explore objetos, arrays e valores aninhados sem tratar inspeção como validação de esquema." },
        { toolId: "url-encoder-decoder", purpose: "Codifique ou decodifique componentes de URL e revise separadores antes de remontar o endereço." },
        { toolId: "uuid-generator", purpose: "Gere um identificador por vez para um registro de exemplo, não uma senha ou token de acesso." },
        { toolId: "formatador-sql", purpose: "Organize o texto SQL com um dialeto disponível antes de revisar e testar a consulta em outro ambiente." },
      ],
      faq: [
        { question: "O Formatador de JSON valida alguma coisa?", answer: "Sim: JSON.parse verifica se o texto é sintaticamente aceito como JSON. Não valida esquema de API, campos obrigatórios, regras de negócio ou adequação à produção. A formatação bem-sucedida inicia a revisão dos dados, não a conclui." },
        { question: "Devo codificar uma URL completa nessa ferramenta?", answer: "A ação usa encodeURIComponent, que também codifica separadores estruturais. Use-a para o valor do componente pretendido ao montar uma URL. O sistema de destino define se ele deve ser codificado uma vez, se já está codificado ou se exige outra representação." },
        { question: "Posso colar credenciais reais porque o processamento ocorre no navegador?", answer: "Não insira segredos ou credenciais. Transformações locais não excluem exposição pelo dispositivo, extensões, área de transferência ou compartilhamento de tela. Use amostras anonimizadas aqui e um fluxo aprovado para dados sensíveis de produção." },
      ],
      relatedGuides: ["images", "pdfs"],
    },
    es: {
      title: "Utiliza herramientas de datos con seguridad antes de integrar",
      summary: "Inspecciona JSON, codifica texto y componentes URL, genera identificadores y formatea SQL sin confundir preparación con validación de producción.",
      introduction: [
        "Este flujo sirve para desarrollo y soporte técnico que necesitan entender un ejemplo de payload, un valor codificado o una consulta antes de usarlo en una aplicación. Identifica primero la representación: JSON, Base64, componente URL y SQL requieren operaciones distintas. Una salida legible ayuda a revisar, pero no demuestra que la entrada sea fiable o adecuada para producción.",
        "Prepara un ejemplo pequeño y anonimizado. No introduzcas contraseñas, claves de API, tokens de sesión, cadenas de conexión ni registros de clientes. Las transformaciones relevantes se ejecutan en código del navegador, pero eso no garantiza de forma absoluta la privacidad o seguridad del dispositivo, las extensiones, el portapapeles o una pantalla compartida. Mantén el trabajo sensible en un entorno aprobado.",
      ],
      steps: [
        { title: "1. Identifica la representación antes de modificarla", paragraphs: ["Usa Base64 para texto en ese formato y el Codificador/decodificador de URL para componentes con codificación porcentual. No elijas solo por el aspecto del texto. Comprueba la especificación del sistema y decodifica una vez; repetirlo puede transformar una secuencia porcentual literal en otro valor. Ninguna operación verifica el origen ni hace seguro un enlace desconocido."] },
        { title: "2. Comprueba la sintaxis JSON e inspecciona la estructura", paragraphs: ["El Formateador de JSON utiliza JSON.parse y JSON.stringify para formatear o minificar. Sintaxis incorrecta, comentarios y comas finales no se reparan automáticamente. Guarda una muestra intacta: formatear sustituye el campo y la serialización puede normalizar la representación.", "Para datos anidados, usa el Inspector de JSON y expande objetos y arrays. Comprueba dónde están los valores, si son cadenas o números y si una lista tiene la forma esperada. Aceptar la sintaxis no valida campos obligatorios, reglas de negocio ni el esquema exigido por la API."] },
        { title: "3. Separa identificadores de secretos", paragraphs: ["El Generador de UUID produce un identificador con formato v4 por acción. Utilízalo como ID de un registro de ejemplo cuando la aplicación lo exija, no como contraseña o prueba de permiso. La implementación usa crypto.randomUUID cuando está disponible y una alternativa con Math.random en otros casos; no debe describirse como una credencial de seguridad garantizada."] },
        { title: "4. Formatea SQL para revisar y pruébalo en otro entorno", paragraphs: ["Elige el dialecto de la consulta: SQL estándar, PostgreSQL, MySQL o SQLite. El formateador reorganiza texto; no conecta a una base de datos ni ejecuta la instrucción. Revisa identificadores y condiciones y prueba después en la base prevista con datos de prueba adecuados. Formatear no valida producción, no verifica inyección ni garantiza que sea seguro ejecutar la consulta."] },
        { title: "5. Compara la salida con el contrato del destino", paragraphs: ["Antes de copiar a código o configuración, comprueba escapes, tipos, nombres de campos y representación exigida. Haz una prueba de ida y vuelta con tu muestra de codificación. En JSON, conserva como cadenas los identificadores que requieren precisión entera exacta cuando el contrato lo pida; los números de JavaScript y las claves repetidas pueden cambiar información durante el análisis."] },
      ],
      examples: [
        { title: "Comprobar la ida y vuelta de texto en Base64", input: "El texto no sensible hello.", result: "Codificar devuelve aGVsbG8=; decodificar ese valor devuelve hello.", explanation: "Comprueba la representación de la herramienta de texto, no la confidencialidad. Quien decodifique el valor podrá leerlo. La interfaz trabaja con texto, no con archivos subidos; Base64 mal formado puede producir un error." },
        { title: "Un valor de parámetro con ampersand", input: "El valor de componente A&B.", result: "La codificación URL devuelve A%26B; la decodificación devuelve A&B.", explanation: "La herramienta usa encodeURIComponent para componentes. Aplicarlo a una URL completa también codifica caracteres estructurales como : y /. Decide qué componente necesita codificación antes de reconstruir la URL y comprueba la aplicación receptora." },
        { title: "Distinguir número y cadena en JSON", input: '{"count":2,"items":["pen"]}', result: "Formatear hace legible la estructura; inspeccionar muestra count como número e items como array que contiene una cadena.", explanation: "Cambiar 2 por \"2\" puede seguir dando JSON válido, pero cambia el tipo de dato. Las herramientas no saben si la API lo acepta. Las claves repetidas conservan el último valor analizado; guarda el texto original para comparar." },
      ],
      mistakes: [
        "Base64 es codificación, no cifrado. Codificar una contraseña o token no protege el valor ni hace apropiado pegarlo en una herramienta de diagnóstico.",
        "Una consulta formateada no se ha ejecutado ni aprobado para producción. Revisa operaciones destructivas y prueba en el entorno previsto; el formato no aplica permisos ni parametriza consultas.",
        "Validar sintaxis JSON es más limitado que validar una aplicación. Claves repetidas, enteros muy grandes y campos obligatorios ausentes requieren otras comprobaciones; payloads grandes también pueden ralentizar el análisis en el navegador.",
        "Un error al decodificar URL puede indicar secuencias porcentuales incorrectas, no la necesidad de volver a decodificar. Conserva la entrada y comprueba la codificación con el sistema de origen en lugar de editar hasta que desaparezca el error.",
      ],
      tools: [
        { toolId: "base64", purpose: "Codifica o decodifica una muestra de texto no sensible en Base64 y comprueba la ida y vuelta." },
        { toolId: "formatador-de-json", purpose: "Comprueba la sintaxis JSON y formatea o minifica la entrada aceptada para revisarla." },
        { toolId: "json-inspector", purpose: "Explora objetos, arrays y valores anidados sin tratar la inspección como validación de esquema." },
        { toolId: "url-encoder-decoder", purpose: "Codifica o decodifica componentes URL y revisa separadores antes de reconstruir la dirección." },
        { toolId: "uuid-generator", purpose: "Genera un identificador por vez para un registro de ejemplo, no una contraseña o token de acceso." },
        { toolId: "formatador-sql", purpose: "Organiza SQL con un dialecto disponible antes de revisar y probar la consulta en otro entorno." },
      ],
      faq: [
        { question: "¿El Formateador de JSON valida algo?", answer: "Sí: JSON.parse comprueba que el texto sea sintácticamente aceptable como JSON. No valida esquemas de API, campos obligatorios, reglas de negocio ni idoneidad para producción. Formatear con éxito inicia la revisión de datos, no la termina." },
        { question: "¿Debo codificar una URL completa con esta herramienta?", answer: "La acción utiliza encodeURIComponent y también codifica separadores estructurales. Úsala para el valor del componente previsto al construir una URL. El sistema receptor determina si debe codificarse una vez, si ya está codificado o si necesita otra representación." },
        { question: "¿Puedo pegar credenciales reales porque se procesa en el navegador?", answer: "No introduzcas secretos ni credenciales. Las transformaciones locales no descartan exposición por dispositivo, extensiones, portapapeles o pantalla compartida. Utiliza muestras anonimizadas aquí y un flujo aprobado para datos sensibles de producción." },
      ],
      relatedGuides: ["images", "pdfs"],
    },
  },
};

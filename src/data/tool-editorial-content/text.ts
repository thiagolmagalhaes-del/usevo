import type { ToolEditorialContentCatalog } from "./types";

export const textEditorialContent: ToolEditorialContentCatalog = {
"contador-de-palavras": {
    "pt-BR": {
      howTo: { title: "Como usar o contador de palavras", steps: ["Digite ou cole o texto na área de edição.", "Acompanhe as métricas enquanto digita ou selecione Contar para anunciar o resumo.", "Use Limpar para apagar o texto e voltar todas as métricas a zero."] },
      example: { title: "Exemplo: uma frase curta", description: "Digite `Olá mundo.` no campo de texto.", calculation: "2 palavras · 10 caracteres com espaços · 9 sem espaços · 1 frase · < 1 min", result: "O espaço e o ponto contam nos caracteres com espaços; a frase é reconhecida pelo ponto no fim." },
      useCases: { title: "O que a ferramenta mede", items: ["Palavras, separadas por um ou mais espaços, tabulações ou quebras de linha.", "Caracteres com espaços e caracteres sem espaços, tabulações ou quebras de linha.", "Frases terminadas por ponto, exclamação ou interrogação, além de linhas e parágrafos separados por linhas em branco.", "Tempo estimado de leitura com base em 200 palavras por minuto." ] },
      notes: { title: "Observações e limitações", items: ["Texto vazio resulta em zero para todas as métricas e em 0 min de leitura.", "Espaços e quebras de linha separam palavras; caracteres com espaços incluem espaços, pontuação e quebras de linha.", "De 1 a 199 palavras, o tempo aparece como < 1 min; a partir de 200 palavras, a estimativa é arredondada para cima.", "Não há análise gramatical, correção ortográfica ou avaliação de qualidade do texto." ] },
      faq: { title: "Perguntas frequentes", items: [{ question: "Como as palavras são contadas?", answer: "O texto é removido das extremidades e dividido por sequências de espaços, tabulações ou quebras de linha." }, { question: "Como os parágrafos são contados?", answer: "Cada bloco não vazio separado por uma ou mais linhas em branco conta como um parágrafo." }, { question: "Qual é a diferença entre os caracteres?", answer: "Caracteres com espaços incluem todos os caracteres digitados. Caracteres sem espaços removem espaços, tabulações e quebras de linha antes da contagem." }, { question: "Como funciona o tempo de leitura?", answer: "A estimativa usa 200 palavras por minuto: texto vazio mostra 0 min, até 199 palavras mostra < 1 min e valores maiores são arredondados para cima." }] },
      relatedTools: { title: "Ferramentas relacionadas", items: [{ toolId: "conversor-maiusculas-minusculas", label: "Conversor de Maiúsculas e Minúsculas", description: "Converta a capitalização do texto antes de contar suas métricas." }, { toolId: "comparador-de-texto", label: "Comparador de Texto", description: "Compare duas versões de um texto linha por linha." }] },
    },
    en: {
      howTo: { title: "Count words online instantly", steps: ["Paste or type text into the editing area.", "Watch the word count, characters, sentences, paragraphs, lines, and reading time update as you write.", "Select Count to announce the current summary, or Clear to start again."] },
      example: { title: "What this word counter measures", description: "The tool keeps the main writing metrics together while you work.", calculation: "Words · Characters with and without spaces · Sentences · Paragraphs · Lines · Reading time", result: "Reading time is estimated at 200 words per minute and rounds up to the next full minute." },
      useCases: { title: "How words are counted", items: ["Words are counted after trimming the text, then splitting it wherever there are spaces, tabs, or line breaks. Punctuation stays with the surrounding text and does not create a separate word by itself.", "Hyphenated terms and contractions stay as one word when they contain no whitespace. A number also counts as a word when it is separated by whitespace.", "Sentences are recognized when a period, exclamation mark, or question mark is followed by whitespace or the end of the text. Paragraphs are non-empty blocks separated by blank lines.", "Microsoft Word or Google Docs can use different counting rules in some situations. If a specific application sets the requirement, check the same text there before submitting it."] },
      notes: { title: "When to use a word counter", items: ["Check essays and assignments against a required length.", "Review articles and blog posts before publishing.", "Keep captions and social posts within a planned limit.", "Measure any draft when you need a quick, simple writing count."] },
      privacy: { title: "Privacy", paragraphs: ["Your text is processed locally in your browser as you type or paste. This tool does not upload or store the text you enter."] },
      faq: { title: "Frequently asked questions", items: [{ question: "What counts as a word?", answer: "After trimming the text, USEVO counts each sequence separated by spaces, tabs, or line breaks as one word." }, { question: "Do hyphenated words and contractions count as one word?", answer: "Yes. Because they contain no whitespace, a hyphenated term or contraction is counted as one word." }, { question: "Why can my count differ from Microsoft Word or Google Docs?", answer: "Different applications can apply different counting rules. If an assignment or publication requires a count from a specific application, verify the same text there." }, { question: "Does USEVO store or upload my text?", answer: "No. The counter processes your text locally in your browser and does not upload or store it." }, { question: "How is reading time calculated?", answer: "The estimate uses 200 words per minute. Empty text shows 0 min, text under 200 words shows less than one minute, and longer text rounds up to the next full minute." }, { question: "Can I use this for essays and social-media limits?", answer: "Yes. It can help you check a draft before submitting or posting it. Use the platform or assignment rules as the final reference when an exact limit matters." }] },
      relatedTools: { title: "Related tools", items: [{ toolId: "conversor-maiusculas-minusculas", label: "Case Converter", description: "Adjust capitalization, then check the length of the final text here." }, { toolId: "comparador-de-texto", label: "Text Comparator", description: "Compare two drafts line by line, then count the version you plan to use." }] },
    },
    es: {
      howTo: { title: "Cómo usar el contador de palabras", steps: ["Escribe o pega el texto en el área de edición.", "Consulta las métricas mientras escribes o selecciona Contar para anunciar el resumen.", "Usa Limpiar para borrar el texto y devolver todas las métricas a cero."] },
      example: { title: "Ejemplo: una frase corta", description: "Escribe `Hola mundo.` en el campo de texto.", calculation: "2 palabras · 11 caracteres con espacios · 10 sin espacios · 1 frase · < 1 min", result: "El espacio y el punto cuentan en los caracteres con espacios; la frase se reconoce por el punto final." },
      useCases: { title: "Qué mide la herramienta", items: ["Palabras separadas por uno o más espacios, tabulaciones o saltos de línea.", "Caracteres con espacios y caracteres sin espacios, tabulaciones o saltos de línea.", "Frases terminadas en punto, exclamación o interrogación, además de líneas y párrafos separados por líneas en blanco.", "Tiempo estimado de lectura basado en 200 palabras por minuto." ] },
      notes: { title: "Notas y limitaciones", items: ["El texto vacío da cero en todas las métricas y 0 min de lectura.", "Los espacios y saltos de línea separan palabras; los caracteres con espacios incluyen espacios, puntuación y saltos de línea.", "De 1 a 199 palabras, el tiempo aparece como < 1 min. A partir de 200 palabras, la estimación se redondea hacia arriba.", "No hay análisis gramatical, corrección ortográfica ni evaluación de calidad del texto." ] },
      faq: { title: "Preguntas frecuentes", items: [{ question: "¿Cómo se cuentan las palabras?", answer: "El texto se recorta en los extremos y se divide por secuencias de espacios, tabulaciones o saltos de línea." }, { question: "¿Cómo se cuentan los párrafos?", answer: "Cada bloque no vacío separado por una o más líneas en blanco cuenta como un párrafo." }, { question: "¿Cuál es la diferencia entre los caracteres?", answer: "Los caracteres con espacios incluyen todos los caracteres escritos. Los caracteres sin espacios eliminan espacios, tabulaciones y saltos de línea antes de contar." }, { question: "¿Cómo funciona el tiempo de lectura?", answer: "La estimación usa 200 palabras por minuto: el texto vacío muestra 0 min, hasta 199 palabras muestra < 1 min y los valores mayores se redondean hacia arriba." }] },
      relatedTools: { title: "Herramientas relacionadas", items: [{ toolId: "conversor-maiusculas-minusculas", label: "Convertidor de Mayúsculas y Minúsculas", description: "Convierte la capitalización del texto antes de contar sus métricas." }, { toolId: "comparador-de-texto", label: "Comparador de texto", description: "Compara dos versiones de texto línea por línea." }] },
    },
  },
  "conversor-maiusculas-minusculas": {
    "pt-BR": {
      howTo: { title: "Como usar o conversor de maiúsculas e minúsculas", steps: ["Digite ou cole o texto original; ele permanece intacto durante a conversão.", "Escolha Maiúsculas, minúsculas, Primeira letra das frases, Iniciais maiúsculas ou Inverter maiúsculas e minúsculas.", "Revise o resultado separado, copie-o quando precisar ou use Limpar para recomeçar."] },
      example: { title: "Exemplo: organizar a capitalização", description: "Digite `oLÁ!  \"COMO VAI?\" nova linha` e selecione Primeira letra das frases.", calculation: "oLÁ!  \"COMO VAI?\" nova linha → Olá!  \"Como vai?\" Nova linha", result: "Espaços, aspas e pontuação continuam no mesmo lugar; a regra capitaliza a próxima letra depois de . ! ou ?." },
      useCases: { title: "Conversões disponíveis", items: ["Maiúsculas e minúsculas convertem letras usando o suporte Unicode do navegador.", "Primeira letra das frases reduz o texto para minúsculas e capitaliza o início e a primeira letra após . ! ou ?.", "Iniciais maiúsculas faz uma capitalização simples por sequência separada por espaços; não é title case editorial.", "Inverter maiúsculas e minúsculas altera somente caracteres com distinção de caixa."] },
      notes: { title: "Privacidade e limitações", items: ["A conversão acontece localmente no navegador. A ferramenta não envia nem armazena o texto digitado.", "Espaços, tabs, quebras de linha, números, símbolos, emoji e pontuação são preservados; mapeamentos Unicode legítimos podem alterar o tamanho de algumas letras.", "Primeira letra das frases é uma regra mecânica: não preserva automaticamente nomes próprios, siglas ou abreviações como `e.g.`.", "Não há correção gramatical, ortográfica, análise de contexto, regras completas de title case nem manipulação por grafemas."] },
      faq: { title: "Perguntas frequentes", items: [{ question: "Meu texto original é alterado?", answer: "Não. O texto original permanece no primeiro campo e o resultado aparece em uma área separada." }, { question: "Como funciona Primeira letra das frases?", answer: "O texto inteiro vai para minúsculas, e a primeira letra com distinção de caixa no início ou depois de ponto, exclamação ou interrogação vai para maiúsculas." }, { question: "Iniciais maiúsculas segue regras de títulos?", answer: "Não. Ela apenas capitaliza a primeira letra de cada sequência separada por espaços e não trata hífens, apóstrofos ou palavras menores como regras editoriais." }, { question: "O texto é enviado para algum servidor?", answer: "Não. As conversões e métricas são processadas localmente no navegador." }] },
      relatedTools: { title: "Ferramentas relacionadas", items: [{ toolId: "contador-de-palavras", label: "Contador de Palavras", description: "Conte palavras e caracteres do texto original ou convertido." }, { toolId: "comparador-de-texto", label: "Comparador de Texto", description: "Compare o original e a versão convertida linha por linha." }] },
    },
    en: {
      howTo: { title: "How to use the case converter", steps: ["Type or paste the original text; it remains unchanged during conversion.", "Choose UPPERCASE, lowercase, Sentence case, Capitalize words, or Invert case.", "Review the separate result, copy it when needed, or use Clear to start again."] },
      example: { title: "Example: organize capitalization", description: "Enter `hELLO!  \"HOW ARE YOU?\" new line` and choose Sentence case.", calculation: "hELLO!  \"HOW ARE YOU?\" new line → Hello!  \"How are you?\" New line", result: "Spaces, quotation marks, and punctuation remain in place; the rule capitalizes the next cased letter after . ! or ?." },
      useCases: { title: "Available conversions", items: ["UPPERCASE and lowercase convert letters through the browser's Unicode support.", "Sentence case lowercases the text, then capitalizes the start and the first cased letter after . ! or ?.", "Capitalize words applies simple capitalization to whitespace-separated tokens; it is not editorial title case.", "Invert case changes only characters with case distinctions."] },
      notes: { title: "Privacy and limitations", items: ["Conversion happens locally in your browser. The tool does not send or store typed text.", "Spaces, tabs, line breaks, numbers, symbols, emoji, and punctuation are preserved; legitimate Unicode mappings can change the length of some letters.", "Sentence case is a mechanical rule: it does not automatically preserve proper names, acronyms, or abbreviations such as `e.g.`.", "There is no grammar or spell correction, context analysis, complete title-case rule set, or grapheme-level editing."] },
      faq: { title: "Frequently asked questions", items: [{ question: "Does it change my original text?", answer: "No. The original stays in the first field and the converted result is shown separately." }, { question: "How does Sentence case work?", answer: "It lowercases the whole text and uppercases the first cased letter at the start or after a period, exclamation mark, or question mark." }, { question: "Does Capitalize words follow title rules?", answer: "No. It only capitalizes the first letter of each whitespace-separated token and does not apply editorial rules for hyphens, apostrophes, or minor words." }, { question: "Is the text sent to a server?", answer: "No. Conversions and metrics are processed locally in the browser." }] },
      relatedTools: { title: "Related tools", items: [{ toolId: "contador-de-palavras", label: "Word Counter", description: "Count words and characters in the original or converted text." }, { toolId: "comparador-de-texto", label: "Text Comparator", description: "Compare the original and converted versions line by line." }] },
    },
    es: {
      howTo: { title: "Cómo usar el convertidor de mayúsculas y minúsculas", steps: ["Escribe o pega el texto original; permanece intacto durante la conversión.", "Elige MAYÚSCULAS, minúsculas, Primera letra de las frases, Iniciales mayúsculas o Invertir mayúsculas y minúsculas.", "Revisa el resultado separado, cópialo cuando lo necesites o usa Limpiar para empezar de nuevo."] },
      example: { title: "Ejemplo: organizar la capitalización", description: "Escribe `hOLA!  \"¿CÓMO ESTÁS?\" nueva línea` y elige Primera letra de las frases.", calculation: "hOLA!  \"¿CÓMO ESTÁS?\" nueva línea → Hola!  \"¿Cómo estás?\" Nueva línea", result: "Los espacios, las comillas y la puntuación permanecen en el mismo lugar; la regla capitaliza la siguiente letra después de . ! o ?." },
      useCases: { title: "Conversiones disponibles", items: ["MAYÚSCULAS y minúsculas convierten letras mediante el soporte Unicode del navegador.", "Primera letra de las frases pasa el texto a minúsculas y capitaliza el inicio y la primera letra con caja después de . ! o ?.", "Iniciales mayúsculas aplica capitalización simple por secuencia separada por espacios; no es title case editorial.", "Invertir mayúsculas y minúsculas cambia solo caracteres con distinción de caja."] },
      notes: { title: "Privacidad y limitaciones", items: ["La conversión ocurre localmente en el navegador. La herramienta no envía ni almacena el texto escrito.", "Se conservan espacios, tabulaciones, saltos de línea, números, símbolos, emoji y puntuación; los mapeos Unicode legítimos pueden cambiar la longitud de algunas letras.", "Primera letra de las frases es una regla mecánica: no conserva automáticamente nombres propios, siglas ni abreviaturas como `p. ej.`.", "No hay corrección gramatical u ortográfica, análisis de contexto, reglas completas de title case ni edición por grafemas."] },
      faq: { title: "Preguntas frecuentes", items: [{ question: "¿Cambia mi texto original?", answer: "No. El original permanece en el primer campo y el resultado convertido aparece por separado." }, { question: "¿Cómo funciona Primera letra de las frases?", answer: "Pasa todo el texto a minúsculas y pone en mayúscula la primera letra con caja al inicio o después de punto, exclamación o interrogación." }, { question: "¿Iniciales mayúsculas sigue reglas de títulos?", answer: "No. Solo capitaliza la primera letra de cada secuencia separada por espacios y no aplica reglas editoriales para guiones, apóstrofos o palabras menores." }, { question: "¿El texto se envía a un servidor?", answer: "No. Las conversiones y métricas se procesan localmente en el navegador." }] },
      relatedTools: { title: "Herramientas relacionadas", items: [{ toolId: "contador-de-palavras", label: "Contador de palabras", description: "Cuenta palabras y caracteres del texto original o convertido." }, { toolId: "comparador-de-texto", label: "Comparador de texto", description: "Compara el original y la versión convertida línea por línea." }] },
    },
  },
  "gerador-de-letras-diferentes": {
  "pt-BR": {
    "howTo": {
      "title": "Como usar o gerador de letras diferentes",
      "steps": [
        "Digite um trecho curto para comparar as 19 variações que aparecem enquanto você edita. Os estilos usam substituição de caracteres Unicode, marcas combinantes ou mudança de caixa; não instalam uma fonte nem alteram a tipografia do aplicativo de destino.",
        "Escolha uma linha e use seu botão Copiar. Ele copia a variação inteira, não o nome do estilo. Se a cópia automática falhar, selecione o resultado e copie manualmente; confira o conteúdo colado antes de publicar.",
        "Teste o trecho no aplicativo e no dispositivo em que será lido, inclusive com a tecnologia assistiva que seu público usa. Guarde também a versão comum para pesquisa e leitura; Limpar texto remove a entrada e as variações da página."
      ]
    },
    "example": {
      "title": "O que muda em letras, acentos e números",
      "description": "Compare Ab9 no estilo Negrito e Olá, 42! 🧰 no mesmo estilo. O mapeamento de negrito inclui letras latinas sem acento e dígitos, mas não converte o á desse exemplo.",
      "calculation": "Ab9 → 𝐀𝐛𝟗; Olá, 42! 🧰 → 𝐎𝐥á, 𝟒𝟐! 🧰",
      "result": "O á, a pontuação, os espaços e o emoji ficam intactos nesse estilo. Já Sublinhado acrescenta marcas combinantes às letras e números: A B vira A̲ B̲. O efeito depende do estilo; não espere a mesma cobertura para todos os caracteres."
    },
    "useCases": {
      "title": "Escolha um trecho decorativo, não um identificador",
      "items": [
        "Teste um título curto de convite ou um nome de exibição não essencial, mantendo data, endereço e instruções em texto comum. Assim a decoração não vira o único meio de transmitir a informação.",
        "Compare uma palavra nos estilos Circulado, Largura completa e Negrito para ver o que o aplicativo preserva depois de colar. Não há garantia de funcionamento em toda rede social ou dispositivo.",
        "Para mudar apenas maiúsculas e minúsculas em um texto de trabalho, prefira o conversor de caixa. Não use caracteres decorativos em e-mail, URL, senha, nome de usuário de acesso, código ou identificador de produto."
      ]
    },
    "notes": {
      "title": "Caracteres diferentes têm consequências diferentes",
      "items": [
        "Unicode estilizado não é uma fonte baixável. O mesmo resultado pode aparecer com outro desenho, como quadrados ou com caracteres substituídos conforme as fontes e o suporte da plataforma.",
        "A cobertura varia por estilo: Em quadrado transforma A–Z maiúsculos, enquanto Negrito também transforma a–z e dígitos. Acentos e caracteres sem mapeamento podem continuar comuns; estilos combinantes acrescentam marcas em vez de substituir a letra.",
        "Pesquisa e comparação podem tratar 𝐀 como um caractere diferente de A. Não suponha que busca por palavra, filtro, validação de campo ou contagem de caracteres verá o resultado como texto comum.",
        "Leitores de tela podem anunciar símbolos matemáticos, marcas ou sequências de modo inesperado. Não use a decoração para conteúdo essencial, campos críticos ou instruções; ofereça a informação em caracteres comuns.",
        "O botão Copiar depende das permissões e dos recursos do navegador; a página tenta uma alternativa de cópia, mas ela pode falhar. Uma mensagem de cópia não substitui conferir o texto no destino. Não há instalação de fonte, exportação de imagem nem conversão garantida de volta ao original."
      ]
    },
    "faq": {
      "title": "Perguntas frequentes",
      "items": [
        {
          "question": "Por que um acento fica comum no meio do negrito?",
          "answer": "O estilo Negrito mapeia letras A–Z, a–z e dígitos, não todo o Unicode. Em Olá, o á permanece original. Outros estilos usam regras diferentes, por isso não há garantia de transformação uniforme para palavras acentuadas ou outros alfabetos."
        },
        {
          "question": "O texto pode ser encontrado pela pesquisa normal?",
          "answer": "Depende da normalização do destino. Letras matemáticas estilizadas são outros caracteres, mesmo quando parecem A ou B. Mantenha uma versão comum para termos importantes, nomes pesquisáveis e campos que precisam corresponder exatamente a um cadastro."
        },
        {
          "question": "O que faço se Copiar não funcionar ou aparecerem quadrados?",
          "answer": "Selecione a variação e tente copiar manualmente. Depois confira a colagem. Quadrados ou substituições podem indicar que o destino não tem suporte aos caracteres; escolha um estilo mais simples ou use texto comum, sem presumir compatibilidade universal."
        },
        {
          "question": "Posso usar uma variação como senha, e-mail ou informação essencial?",
          "answer": "Evite. Caracteres parecidos não são necessariamente iguais, e podem prejudicar validação, digitação, pesquisa e leitura assistiva. Use o gerador para decoração opcional; preserve caracteres comuns em credenciais, endereços, códigos e informações necessárias para completar uma tarefa."
        }
      ]
    },
    "relatedTools": {
      "title": "Ferramentas relacionadas",
      "items": [
        {
          "toolId": "conversor-maiusculas-minusculas",
          "label": "Conversor de Maiúsculas e Minúsculas",
          "description": "Ajuste a caixa de um texto comum quando o objetivo não for trocar letras por símbolos decorativos."
        },
        {
          "toolId": "comparador-de-texto",
          "label": "Comparador de Texto",
          "description": "Confira as mudanças entre a versão comum e a estilizada antes de usar o trecho."
        }
      ]
    }
  },
  "en": {
    "howTo": {
      "title": "How to use the font generator",
      "steps": [
        "Enter a short passage to compare the 19 variations that appear as you edit. Styles use Unicode character substitution, combining marks, or case changes; they do not install a font or change the destination app's typeface.",
        "Choose a row and select its Copy button. It copies the entire variation, not the style name. If automatic copying fails, select the output and copy it manually; check the pasted content before publishing.",
        "Test the passage in the app and on the device where it will be read, including assistive technology used by your audience. Keep the ordinary-text version for search and reading; Clear text removes the input and its variations from the page."
      ]
    },
    "example": {
      "title": "What changes in letters, accents, and digits",
      "description": "Compare Ab9 in Bold and Olá, 42! 🧰 in the same style. The bold mapping includes unaccented Latin letters and digits, but does not convert the á in this example.",
      "calculation": "Ab9 → 𝐀𝐛𝟗; Olá, 42! 🧰 → 𝐎𝐥á, 𝟒𝟐! 🧰",
      "result": "The á, punctuation, spaces, and emoji stay unchanged in this style. Underline instead adds combining marks to letters and digits: A B becomes A̲ B̲. Each style behaves differently; do not expect identical coverage for every character."
    },
    "useCases": {
      "title": "Decorate a passage, not an identifier",
      "items": [
        "Try a short invitation heading or a nonessential display name, leaving the date, address, and instructions in ordinary text. Decoration should not become the only way to communicate the information.",
        "Compare a word in Circled, Fullwidth, and Bold to see what the destination app preserves after pasting. No style is guaranteed to work across every social network or device.",
        "For a work document that only needs uppercase or lowercase changes, choose Case Converter. Avoid decorative characters in email addresses, URLs, passwords, login usernames, code, or product identifiers."
      ]
    },
    "notes": {
      "title": "Different characters have different consequences",
      "items": [
        "Styled Unicode is not a downloadable font. The same output can have a different appearance, show boxes, or be replaced depending on the platform's fonts and character support.",
        "Coverage varies: Squared transforms uppercase A–Z, while Bold also transforms a–z and digits. Accents and unmapped characters may stay ordinary; combining styles add marks instead of replacing the letter.",
        "Search and comparison can treat 𝐀 as a different character from A. Do not assume keyword search, filters, field validation, or character counts interpret the result as ordinary text.",
        "Screen readers may announce mathematical symbols, marks, or sequences unexpectedly. Do not use decoration for essential content, critical fields, or instructions; provide that information in ordinary characters.",
        "Copy depends on browser permissions and capabilities; the page attempts a fallback, but it can also fail. A copy message does not replace checking the destination. There is no font installation, image export, or guaranteed conversion back to the original."
      ]
    },
    "faq": {
      "title": "Frequently asked questions",
      "items": [
        {
          "question": "Why does an accent stay ordinary inside bold text?",
          "answer": "Bold maps A–Z, a–z, and digits, not all of Unicode. In Olá, á stays original. Other styles have different rules, so accented words and other writing systems are not guaranteed a uniform transformation."
        },
        {
          "question": "Will normal search find the styled text?",
          "answer": "That depends on the destination's normalization. Styled mathematical letters are different characters even when they resemble A or B. Keep an ordinary version for important keywords, searchable names, and fields that must match a record exactly."
        },
        {
          "question": "What if Copy fails or I see boxes after pasting?",
          "answer": "Select the variation and try copying manually, then inspect the pasted text. Boxes or substitutions can mean the destination lacks character support; choose a simpler style or ordinary text instead of assuming universal compatibility."
        },
        {
          "question": "Can I use a variation as a password, email address, or essential information?",
          "answer": "Avoid it. Similar-looking characters are not necessarily equal and can impair validation, typing, search, and assistive reading. Use the generator for optional decoration; keep ordinary characters in credentials, addresses, codes, and information needed to complete a task."
        }
      ]
    },
    "relatedTools": {
      "title": "Related tools",
      "items": [
        {
          "toolId": "conversor-maiusculas-minusculas",
          "label": "Case Converter",
          "description": "Change ordinary letter case when you do not need to substitute decorative symbols."
        },
        {
          "toolId": "comparador-de-texto",
          "label": "Text Comparator",
          "description": "Review changes between the ordinary and styled versions before using the passage."
        }
      ]
    }
  },
  "es": {
    "howTo": {
      "title": "Cómo usar el generador de letras bonitas",
      "steps": [
        "Escribe un fragmento corto para comparar las 19 variaciones que aparecen al editar. Los estilos usan sustitución de caracteres Unicode, marcas combinantes o cambios de caja; no instalan una fuente ni cambian la tipografía de la aplicación de destino.",
        "Elige una fila y pulsa su botón Copiar. Copia la variación completa, no el nombre del estilo. Si falla la copia automática, selecciona la salida y cópiala manualmente; comprueba el contenido pegado antes de publicarlo.",
        "Prueba el fragmento en la aplicación y el dispositivo donde se leerá, incluida la tecnología de asistencia de tu público. Conserva la versión común para búsqueda y lectura; Limpiar texto elimina la entrada y las variaciones de la página."
      ]
    },
    "example": {
      "title": "Qué cambia en letras, acentos y dígitos",
      "description": "Compara Ab9 en Negrita y Olá, 42! 🧰 en el mismo estilo. El mapeo incluye letras latinas sin acento y dígitos, pero no convierte el á de este ejemplo.",
      "calculation": "Ab9 → 𝐀𝐛𝟗; Olá, 42! 🧰 → 𝐎𝐥á, 𝟒𝟐! 🧰",
      "result": "El á, la puntuación, los espacios y el emoji quedan intactos en este estilo. Subrayado añade marcas combinantes a letras y dígitos: A B pasa a A̲ B̲. El efecto depende del estilo; no esperes la misma cobertura para todos los caracteres."
    },
    "useCases": {
      "title": "Decora un fragmento, no un identificador",
      "items": [
        "Prueba un título corto de invitación o un nombre de presentación no esencial, dejando fecha, dirección e instrucciones en texto común. La decoración no debería ser la única forma de comunicar esa información.",
        "Compara una palabra en Con círculo, Ancho completo y Negrita para ver qué conserva la aplicación al pegarla. Ningún estilo está garantizado en todas las redes sociales o dispositivos.",
        "Para un documento de trabajo que solo necesita cambios de mayúsculas, elige el convertidor de caja. Evita caracteres decorativos en correo electrónico, URL, contraseña, usuario de acceso, código o identificador de producto."
      ]
    },
    "notes": {
      "title": "Caracteres distintos tienen consecuencias distintas",
      "items": [
        "Unicode estilizado no es una fuente descargable. La misma salida puede tener otro aspecto, mostrar cuadros o sufrir sustituciones según las fuentes y el soporte de la plataforma.",
        "La cobertura varía: En cuadrado transforma A–Z mayúsculas, mientras Negrita también transforma a–z y dígitos. Acentos y caracteres sin mapeo pueden quedar comunes; los estilos combinantes añaden marcas en vez de sustituir la letra.",
        "Búsqueda y comparación pueden tratar 𝐀 como un carácter distinto de A. No supongas que búsqueda de palabras, filtros, validación de campos o recuentos interpretan la salida como texto común.",
        "Los lectores de pantalla pueden anunciar símbolos matemáticos, marcas o secuencias de forma inesperada. No uses la decoración para contenido esencial, campos críticos o instrucciones; ofrece esa información con caracteres comunes.",
        "Copiar depende de permisos y recursos del navegador; la página intenta una alternativa que también puede fallar. Un mensaje de copia no sustituye comprobar el destino. No hay instalación de fuentes, exportación de imágenes ni conversión garantizada al original."
      ]
    },
    "faq": {
      "title": "Preguntas frecuentes",
      "items": [
        {
          "question": "¿Por qué un acento queda común dentro de la negrita?",
          "answer": "Negrita mapea A–Z, a–z y dígitos, no todo Unicode. En Olá, á permanece original. Otros estilos tienen reglas distintas, por lo que no se garantiza una transformación uniforme para palabras acentuadas u otros alfabetos."
        },
        {
          "question": "¿La búsqueda normal encontrará el texto estilizado?",
          "answer": "Depende de la normalización del destino. Las letras matemáticas estilizadas son caracteres distintos aunque parezcan A o B. Conserva una versión común para términos importantes, nombres buscables y campos que deban coincidir exactamente con un registro."
        },
        {
          "question": "¿Qué hago si Copiar falla o aparecen cuadros al pegar?",
          "answer": "Selecciona la variación e intenta copiar manualmente; revisa después el texto pegado. Los cuadros o sustituciones pueden indicar falta de soporte en el destino. Elige un estilo más sencillo o texto común sin suponer compatibilidad universal."
        },
        {
          "question": "¿Puedo usar una variación como contraseña, correo o información esencial?",
          "answer": "Evítalo. Caracteres parecidos no son necesariamente iguales y pueden dificultar validación, escritura, búsqueda y lectura asistida. Usa el generador para decoración opcional; conserva caracteres comunes en credenciales, direcciones, códigos e información necesaria para completar tareas."
        }
      ]
    },
    "relatedTools": {
      "title": "Herramientas relacionadas",
      "items": [
        {
          "toolId": "conversor-maiusculas-minusculas",
          "label": "Convertidor de Mayúsculas y Minúsculas",
          "description": "Cambia la caja de letras comunes cuando no necesites sustituirlas por símbolos decorativos."
        },
        {
          "toolId": "comparador-de-texto",
          "label": "Comparador de texto",
          "description": "Revisa los cambios entre las versiones común y estilizada antes de usar el fragmento."
        }
      ]
    }
  }
},
"comparador-de-texto": {
    "pt-BR": {
      howTo: { title: "Como usar o comparador de texto", steps: ["Cole a primeira versão no campo Texto original.", "Cole a segunda versão no campo Texto modificado.", "Selecione Comparar para ver as diferenças por linha; Limpar apaga os dois campos e o resultado."] },
      example: { title: "Exemplo: uma linha alterada", description: "Use `A reunião é hoje.` como original e `A reunião é amanhã.` como texto modificado.", calculation: "linha original removida + linha modificada adicionada", result: "A interface mostra a remoção em vermelho e a adição em verde; linhas sem mudança aparecem em cinza." },
      useCases: { title: "Quando usar", items: ["Revisar duas versões de um texto com mudanças de linha.", "Conferir trechos adicionados, removidos e inalterados antes de publicar uma versão.", "Comparar listas, notas ou conteúdo estruturado em linhas." ] },
      notes: { title: "Observações e limitações", items: ["A comparação usa `diffLines` da biblioteca `diff`, portanto trabalha por linhas e não por significado.", "Maiúsculas, pontuação, espaços e outras diferenças no conteúdo de uma linha podem fazer essa linha aparecer como alterada.", "Não há detecção de plágio, comparação semântica, correção automática ou mensagens de erro para campos vazios." ] },
      faq: { title: "Perguntas frequentes", items: [{ question: "Como as diferenças aparecem?", answer: "Linhas adicionadas recebem fundo verde, removidas recebem fundo vermelho e trechos sem alteração aparecem em cinza." }, { question: "A comparação diferencia maiúsculas e pontuação?", answer: "Sim. Como as linhas são comparadas literalmente, mudanças de letras, pontuação ou espaços podem gerar diferença." }, { question: "Posso comparar textos vazios?", answer: "Sim. A ação compara os valores dos campos, inclusive strings vazias; se não houver partes para mostrar, o resultado fica vazio." }, { question: "A ferramenta entende o significado do texto?", answer: "Não. Ela identifica diferenças de linhas com a biblioteca diff, sem análise semântica ou detecção de plágio." }] },
      relatedTools: { title: "Ferramentas relacionadas", items: [{ toolId: "contador-de-palavras", label: "Contador de Palavras", description: "Conte palavras, caracteres, frases e linhas de um texto." }, { toolId: "conversor-maiusculas-minusculas", label: "Conversor de Maiúsculas e Minúsculas", description: "Converta a capitalização antes de comparar as versões." }] },
    },
    en: {
      howTo: { title: "How to use the text comparator", steps: ["Paste the first version into the Original text field.", "Paste the second version into the Modified text field.", "Select Compare to view line-based differences; Clear removes both fields and the result."] },
      example: { title: "Example: one changed line", description: "Use `The meeting is today.` as the original and `The meeting is tomorrow.` as the modified text.", calculation: "original line removed + modified line added", result: "The interface shows the removal in red and the addition in green; unchanged lines appear in gray." },
      useCases: { title: "Useful situations", items: ["Review two text versions that contain line changes.", "Check added, removed, and unchanged sections before publishing a version.", "Compare lists, notes, or content structured in lines." ] },
      notes: { title: "Notes and limitations", items: ["The comparison uses `diffLines` from the `diff` library, so it works by lines rather than meaning.", "Capitalization, punctuation, spaces, and other differences within a line can cause that line to appear changed.", "There is no plagiarism detection, semantic comparison, automatic correction, or empty-field error message." ] },
      faq: { title: "Frequently asked questions", items: [{ question: "How are differences displayed?", answer: "Added lines have a green background, removed lines have a red background, and unchanged sections appear in gray." }, { question: "Does the comparison distinguish capitalization and punctuation?", answer: "Yes. Because lines are compared literally, changes to letters, punctuation, or spaces can produce a difference." }, { question: "Can I compare empty text?", answer: "Yes. The action compares the field values, including empty strings; if there are no parts to display, the result remains empty." }, { question: "Does the tool understand text meaning?", answer: "No. It identifies line differences with the diff library, without semantic analysis or plagiarism detection." }] },
      relatedTools: { title: "Related tools", items: [{ toolId: "contador-de-palavras", label: "Word Counter", description: "Count words, characters, sentences, and lines in text." }, { toolId: "conversor-maiusculas-minusculas", label: "Case Converter", description: "Convert capitalization before comparing versions." }] },
    },
    es: {
      howTo: { title: "Cómo usar el comparador de texto", steps: ["Pega la primera versión en el campo Texto original.", "Pega la segunda versión en el campo Texto modificado.", "Selecciona Comparar para ver las diferencias por línea; Limpiar borra ambos campos y el resultado."] },
      example: { title: "Ejemplo: una línea modificada", description: "Usa `La reunión es hoy.` como original y `La reunión es mañana.` como texto modificado.", calculation: "línea original eliminada + línea modificada añadida", result: "La interfaz muestra la eliminación en rojo y la adición en verde; las líneas sin cambios aparecen en gris." },
      useCases: { title: "Cuándo resulta útil", items: ["Revisar dos versiones de texto con cambios de línea.", "Comprobar fragmentos añadidos, eliminados y sin cambios antes de publicar una versión.", "Comparar listas, notas o contenido estructurado en líneas." ] },
      notes: { title: "Notas y limitaciones", items: ["La comparación usa `diffLines` de la biblioteca `diff`, por lo que trabaja por líneas y no por significado.", "Mayúsculas, puntuación, espacios y otras diferencias dentro de una línea pueden hacer que aparezca modificada.", "No hay detección de plagio, comparación semántica, corrección automática ni mensaje de error para campos vacíos." ] },
      faq: { title: "Preguntas frecuentes", items: [{ question: "¿Cómo aparecen las diferencias?", answer: "Las líneas añadidas tienen fondo verde, las eliminadas fondo rojo y los fragmentos sin cambios aparecen en gris." }, { question: "¿La comparación distingue mayúsculas y puntuación?", answer: "Sí. Como las líneas se comparan literalmente, los cambios de letras, puntuación o espacios pueden generar una diferencia." }, { question: "¿Puedo comparar texto vacío?", answer: "Sí. La acción compara los valores de los campos, incluso cadenas vacías; si no hay partes que mostrar, el resultado queda vacío." }, { question: "¿La herramienta entiende el significado del texto?", answer: "No. Identifica diferencias de líneas con la biblioteca diff, sin análisis semántico ni detección de plagio." }] },
      relatedTools: { title: "Herramientas relacionadas", items: [{ toolId: "contador-de-palavras", label: "Contador de palabras", description: "Cuenta palabras, caracteres, frases y líneas de un texto." }, { toolId: "conversor-maiusculas-minusculas", label: "Convertidor de Mayúsculas y Minúsculas", description: "Convierte la capitalización antes de comparar las versiones." }] },
    },
  },
};

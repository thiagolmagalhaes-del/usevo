import type { ToolEditorialContentCatalog } from "./types";

export const utilitiesEditorialContent: ToolEditorialContentCatalog = {
  "gerador-de-codigo-de-barras": {
    "pt-BR": {
      "howTo": {
        "title": "Como criar um código de barras",
        "steps": [
          "Defina se você precisa representar um identificador interno ou uma numeração de varejo já atribuída. Selecione um dos seis formatos disponíveis e digite o conteúdo; gerar a imagem não atribui um GTIN nem registra um produto na GS1.",
          "Confira erros e a prévia atualizada ao editar. Ajuste largura das barras de 1 a 4, altura de 40 a 180, valor visível e fundo branco ou transparente. Esses controles não são uma configuração de tamanho físico em milímetros nem uma certificação de impressão.",
          "Baixe PNG ou SVG, preserve as margens claras laterais e imprima uma amostra no tamanho final. Teste com o leitor e o sistema que usarão a etiqueta, conferindo o valor recebido; a prévia correta na tela não garante leitura na embalagem."
        ]
      },
      "example": {
        "title": "Um identificador interno e um verificador EAN-13",
        "description": "Para uma caixa de material interno, use KIT-042 em CODE128. Para testar o cálculo do verificador, selecione EAN-13 e informe a sequência demonstrativa 400638133393, sem tratá-la como numeração disponível para seu produto.",
        "calculation": "CODE128: KIT-042; EAN-13: 400638133393 → 4006381333931",
        "result": "No exemplo EAN-13, o dígito final calculado é 1. A sequência completa 4006381333932 é rejeitada porque o verificador não confere. O dígito verifica a estrutura numérica, não a titularidade, o cadastro do produto ou a qualidade da impressão."
      },
      "useCases": {
        "title": "Escolha pelo formato aceito no sistema de destino",
        "items": [
          "CODE128 aceita ASCII imprimível, como KIT-042, letras maiúsculas/minúsculas e espaços. Use para identificação interna se o leitor e o cadastro aceitarem esse formato; não equivale automaticamente a GS1-128.",
          "CODE39 aceita A–Z, dígitos, espaço e - . $ / + %. Não converte minúsculas: abc e KIT_042 são rejeitados. Escolha-o somente se esse conjunto restrito atender ao sistema.",
          "EAN-13 aceita 12 ou 13 dígitos; EAN-8, 7 ou 8; UPC-A, 11 ou 12. A entrada menor não tem o verificador final, que é calculado; a entrada completa precisa passar na validação.",
          "ITF-14 aceita 13 ou 14 dígitos com a mesma regra de adicionar ou validar o último dígito. Use numeração apropriada ao fluxo de embalagens; a ferramenta não escolhe identificadores oficiais nem valida cadastro externo."
        ]
      },
      "notes": {
        "title": "Validação não é registro nem garantia de leitura",
        "items": [
          "EAN, UPC-A e ITF-14 aceitam apenas dígitos, sem espaços ou separadores; preserve zeros iniciais. O verificador usa pesos alternados 3 e 1 a partir da direita do corpo e completa a soma para um múltiplo de dez. Letras, comprimentos errados ou um verificador incorreto impedem o download da prévia inválida.",
          "Um código interno representa o valor do seu cadastro. Uma numeração oficial de varejo precisa ser obtida e atribuída pelo processo adequado da GS1; gerar uma imagem aqui não registra um produto na GS1 nem confirma a quem pertence um número existente.",
          "Quiet zone é a área clara sem texto ou desenho antes e depois das barras. A imagem tem margem configurada em 12, mas não promete atender às dimensões exigidas em cada uso. Não corte as margens; o fundo transparente só é útil se o suporte final manter contraste e área livre.",
          "As barras têm cor escura fixa. Preserve contraste, proporções e bordas ao imprimir; ampliar um PNG pode desfocar e esticar altera as barras. SVG permite escala vetorial, mas tamanho físico, impressora, papel e superfície continuam exigindo teste no leitor real. O Leitor de QR Code não lê estes códigos lineares."
        ]
      },
      "faq": {
        "title": "Perguntas frequentes",
        "items": [
          {
            "question": "Posso inventar um EAN-13 para vender meu produto?",
            "answer": "A ferramenta desenha e verifica a estrutura, não atribui numeração oficial. Para identificação de varejo, obtenha e atribua a numeração pelo processo da GS1 aplicável ao produto. Um número que passa no verificador não comprova cadastro, titularidade ou disponibilidade."
          },
          {
            "question": "Por que meu número perde um dígito ou recebe outro no final?",
            "answer": "Confira o formato e o comprimento. EAN-13 com 12 dígitos recebe o 13º verificador; com 13, o último é validado, não removido. EAN-8, UPC-A e ITF-14 seguem seus próprios comprimentos. Preserve zeros iniciais e não acrescente um verificador duas vezes."
          },
          {
            "question": "Por que CODE39 rejeita meu identificador?",
            "answer": "Ele aceita só A–Z maiúsculos, dígitos, espaço e - . $ / + %. Minúsculas, acentos e sublinhado não são convertidos automaticamente. Use um identificador compatível ou CODE128 para ASCII imprimível se o sistema de destino aceitar esse formato."
          },
          {
            "question": "PNG ou SVG garante que a etiqueta será lida?",
            "answer": "Nenhum dos dois garante leitura. PNG é uma imagem raster; SVG preserva formas vetoriais ao escalar. Em ambos, mantenha proporções, contraste e quiet zone, imprima no tamanho final e teste o valor recebido no leitor e cadastro reais. A ferramenta não faz verificação certificada de impressão."
          }
        ]
      },
      "relatedTools": {
        "title": "Ferramentas relacionadas",
        "items": [
          {
            "toolId": "gerador-de-qr-code",
            "label": "Gerador de QR Code",
            "description": "Use QR quando o objetivo for compartilhar um endereço ou texto, em vez de uma etiqueta linear."
          },
          {
            "toolId": "uuid-generator",
            "label": "Gerador de UUID",
            "description": "Crie um identificador interno quando seu cadastro pedir UUID; não é numeração oficial de varejo."
          }
        ]
      }
    },
    "en": {
      "howTo": {
        "title": "How to create a barcode",
        "steps": [
          "Decide whether you need to represent an internal identifier or an already assigned retail number. Select one of the six available formats and enter the value; generating the image does not allocate a GTIN or register a product with GS1.",
          "Review errors and the preview as you edit. Adjust bar width from 1 to 4, height from 40 to 180, visible value, and white or transparent background. These controls are not a physical size setting in millimeters or a print certification.",
          "Download PNG or SVG, keep the clear side margins, and print a sample at the final size. Test with the actual scanner and receiving system, checking the captured value; a correct screen preview does not guarantee scanning on packaging."
        ]
      },
      "example": {
        "title": "An internal identifier and an EAN-13 check digit",
        "description": "For an internal supplies box, use KIT-042 in CODE128. To test the check-digit calculation, select EAN-13 and enter the demonstration sequence 400638133393; do not treat it as an available number for your product.",
        "calculation": "CODE128: KIT-042; EAN-13: 400638133393 → 4006381333931",
        "result": "The EAN-13 example has a calculated final digit of 1. The complete sequence 4006381333932 is rejected because its check digit is incorrect. A check digit verifies numerical structure, not ownership, product registration, or print quality."
      },
      "useCases": {
        "title": "Choose the format accepted by the receiving system",
        "items": [
          "CODE128 accepts printable ASCII, such as KIT-042, uppercase/lowercase letters, and spaces. Use it for internal identification when the scanner and records support it; it does not automatically mean GS1-128.",
          "CODE39 accepts A–Z, digits, spaces, and - . $ / + %. It does not convert lowercase: abc and KIT_042 are rejected. Choose it only when its restricted character set fits the system.",
          "EAN-13 accepts 12 or 13 digits; EAN-8 accepts 7 or 8; UPC-A accepts 11 or 12. The shorter input lacks the final check digit, which is calculated; a complete input must pass validation.",
          "ITF-14 accepts 13 or 14 digits with the same rule of adding or validating the last digit. Use numbering appropriate to the packaging workflow; the tool does not choose official identifiers or validate an external registration."
        ]
      },
      "notes": {
        "title": "Validation is not registration or a scanning guarantee",
        "items": [
          "EAN, UPC-A, and ITF-14 accept digits only, without spaces or separators; preserve leading zeros. The check digit uses alternating weights of 3 and 1 from the right of the body and completes the sum to a multiple of ten. Letters, incorrect lengths, or a wrong check digit disable downloads for an invalid preview.",
          "An internal code represents a value in your own records. Official retail numbering must be obtained and allocated through the appropriate GS1 process; generating an image here does not register a product with GS1 or confirm who owns an existing number.",
          "The quiet zone is the clear area without text or graphics before and after the bars. The image has a configured margin of 12, but does not promise the dimensions required for every use. Do not crop those margins; a transparent background only works when the final surface preserves contrast and clear space.",
          "The bars have a fixed dark color. Preserve contrast, proportions, and edges when printing; enlarging a PNG can blur it and stretching changes the bars. SVG supports vector scaling, but physical size, printer, paper, and surface still require a real scanner test. QR Code Scanner does not read these linear barcodes."
        ]
      },
      "faq": {
        "title": "Frequently asked questions",
        "items": [
          {
            "question": "Can I invent an EAN-13 to sell my product?",
            "answer": "The tool draws the symbol and checks its structure; it does not allocate official numbering. For retail identification, obtain and assign numbering through the GS1 process applicable to the product. Passing a check-digit test does not establish registration, ownership, or availability."
          },
          {
            "question": "Why is a digit added to my number?",
            "answer": "Check the format and length. EAN-13 with 12 digits receives a 13th check digit; with 13, the last digit is validated, not removed. EAN-8, UPC-A, and ITF-14 use their own lengths. Preserve leading zeros and do not append a check digit twice."
          },
          {
            "question": "Why does CODE39 reject my identifier?",
            "answer": "It accepts only uppercase A–Z, digits, spaces, and - . $ / + %. Lowercase, accents, and underscores are not converted automatically. Use a compatible identifier or CODE128 for printable ASCII if the receiving system accepts that format."
          },
          {
            "question": "Does PNG or SVG guarantee a scannable label?",
            "answer": "Neither guarantees scanning. PNG is a raster image; SVG retains vector shapes when scaled. For either, preserve proportions, contrast, and the quiet zone, print at the final size, and test the captured value in the actual scanner and records. The tool does not provide certified print verification."
          }
        ]
      },
      "relatedTools": {
        "title": "Related tools",
        "items": [
          {
            "toolId": "gerador-de-qr-code",
            "label": "QR Code Generator",
            "description": "Choose QR to share an address or text rather than create a linear label."
          },
          {
            "toolId": "uuid-generator",
            "label": "UUID Generator",
            "description": "Create an internal identifier when your records require UUID; it is not official retail numbering."
          }
        ]
      }
    },
    "es": {
      "howTo": {
        "title": "Cómo crear un código de barras",
        "steps": [
          "Decide si necesitas representar un identificador interno o una numeración comercial ya asignada. Selecciona uno de los seis formatos disponibles e introduce el valor; generar la imagen no asigna un GTIN ni registra un producto en GS1.",
          "Revisa errores y la vista previa mientras editas. Ajusta ancho de barras de 1 a 4, altura de 40 a 180, valor visible y fondo blanco o transparente. Estos controles no son un ajuste de tamaño físico en milímetros ni una certificación de impresión.",
          "Descarga PNG o SVG, conserva los márgenes claros laterales e imprime una muestra al tamaño final. Prueba con el lector y el sistema reales y comprueba el valor recibido; una vista previa correcta no garantiza lectura sobre el envase."
        ]
      },
      "example": {
        "title": "Un identificador interno y un dígito de control EAN-13",
        "description": "Para una caja de material interno, usa KIT-042 en CODE128. Para probar el cálculo del dígito de control, selecciona EAN-13 e introduce la secuencia demostrativa 400638133393; no la trates como numeración disponible para tu producto.",
        "calculation": "CODE128: KIT-042; EAN-13: 400638133393 → 4006381333931",
        "result": "En el ejemplo EAN-13, el dígito final calculado es 1. La secuencia completa 4006381333932 se rechaza porque su dígito de control es incorrecto. El dígito verifica la estructura numérica, no la titularidad, el registro del producto o la calidad de impresión."
      },
      "useCases": {
        "title": "Elige el formato admitido por el sistema receptor",
        "items": [
          "CODE128 acepta ASCII imprimible, como KIT-042, letras mayúsculas/minúsculas y espacios. Úsalo para identificación interna si el lector y el registro lo admiten; no equivale automáticamente a GS1-128.",
          "CODE39 acepta A–Z, dígitos, espacio y - . $ / + %. No convierte minúsculas: abc y KIT_042 se rechazan. Elígelo solo si su conjunto restringido de caracteres encaja en el sistema.",
          "EAN-13 acepta 12 o 13 dígitos; EAN-8, 7 u 8; UPC-A, 11 o 12. La entrada corta no lleva el dígito final, que se calcula; la entrada completa debe superar la validación.",
          "ITF-14 acepta 13 o 14 dígitos con la misma regla de añadir o validar el último. Usa numeración apropiada para el flujo de embalajes; la herramienta no elige identificadores oficiales ni valida registros externos."
        ]
      },
      "notes": {
        "title": "Validación no es registro ni garantía de lectura",
        "items": [
          "EAN, UPC-A e ITF-14 aceptan solo dígitos, sin espacios o separadores; conserva los ceros iniciales. El dígito de control usa pesos alternos 3 y 1 desde la derecha del cuerpo y completa la suma hasta un múltiplo de diez. Letras, longitud incorrecta o dígito erróneo desactivan las descargas de una vista previa no válida.",
          "Un código interno representa un valor de tu registro. La numeración oficial comercial debe obtenerse y asignarse mediante el proceso adecuado de GS1; generar una imagen aquí no registra un producto en GS1 ni confirma a quién pertenece un número existente.",
          "La quiet zone es la zona clara sin texto ni dibujos antes y después de las barras. La imagen tiene margen configurado en 12, pero no promete cumplir las dimensiones exigidas en cada uso. No recortes esos márgenes; el fondo transparente solo sirve si el soporte final conserva contraste y espacio libre.",
          "Las barras tienen un color oscuro fijo. Conserva contraste, proporciones y bordes al imprimir; ampliar un PNG puede desenfocar y estirar altera las barras. SVG permite escala vectorial, pero tamaño físico, impresora, papel y superficie siguen necesitando prueba real. El Escáner de código QR no lee estos códigos lineales."
        ]
      },
      "faq": {
        "title": "Preguntas frecuentes",
        "items": [
          {
            "question": "¿Puedo inventar un EAN-13 para vender mi producto?",
            "answer": "La herramienta dibuja y comprueba la estructura, no asigna numeración oficial. Para identificación comercial, obtén y asigna numeración mediante el proceso de GS1 aplicable al producto. Superar la prueba del dígito de control no demuestra registro, titularidad o disponibilidad."
          },
          {
            "question": "¿Por qué se añade un dígito a mi número?",
            "answer": "Comprueba formato y longitud. EAN-13 con 12 dígitos recibe el 13.º de control; con 13, el último se valida, no se elimina. EAN-8, UPC-A e ITF-14 usan sus propias longitudes. Conserva los ceros iniciales y no añadas el dígito de control dos veces."
          },
          {
            "question": "¿Por qué CODE39 rechaza mi identificador?",
            "answer": "Solo acepta A–Z mayúsculas, dígitos, espacio y - . $ / + %. Minúsculas, acentos y guion bajo no se convierten automáticamente. Usa un identificador compatible o CODE128 para ASCII imprimible si el sistema receptor acepta ese formato."
          },
          {
            "question": "¿PNG o SVG garantiza que la etiqueta se lea?",
            "answer": "Ninguno garantiza lectura. PNG es una imagen raster; SVG conserva formas vectoriales al escalar. En ambos, mantén proporciones, contraste y quiet zone, imprime al tamaño final y prueba el valor recibido en lector y registro reales. La herramienta no proporciona verificación certificada de impresión."
          }
        ]
      },
      "relatedTools": {
        "title": "Herramientas relacionadas",
        "items": [
          {
            "toolId": "gerador-de-qr-code",
            "label": "Generador de códigos QR",
            "description": "Elige QR para compartir una dirección o texto en lugar de crear una etiqueta lineal."
          },
          {
            "toolId": "uuid-generator",
            "label": "Generador de UUID",
            "description": "Crea un identificador interno si tu registro exige UUID; no es numeración oficial comercial."
          }
        ]
      }
    }
  },
  "roleta-de-nomes": {
    "pt-BR": {
      "howTo": {
        "title": "Como usar a roleta de nomes",
        "steps": [
          "Coloque um nome ou opção por linha e confira a contagem: linhas vazias são ignoradas e espaços nas pontas são removidos. São necessárias de 2 a 100 entradas válidas, incluindo repetições; confira duplicatas antes de girar.",
          "Defina a regra da atividade com o grupo. Uma ocorrência por pessoa dá a cada pessoa uma fatia; repetir um nome lhe dá mais fatias. Embaralhar muda a ordem visual, mas não remove duplicatas nem muda esse peso proporcional.",
          "Selecione Girar a roleta e confira o nome completo no painel de resultado. Girar novamente mantém a lista; Remover o vencedor e girar elimina só a ocorrência escolhida e inicia outra seleção se restarem pelo menos duas entradas."
        ]
      },
      "example": {
        "title": "Uma ordem de apresentação com uma duplicata",
        "description": "Para uma apresentação em equipe, digite Ana, Ana, Bruno e Carla em quatro linhas. A lista tem quatro entradas, embora contenha apenas três nomes distintos.",
        "calculation": "Ana: 2/4; Bruno: 1/4; Carla: 1/4",
        "result": "Ana ocupa metade das fatias. Se Ana vencer e você remover a ocorrência sorteada, sobra Ana, Bruno e Carla: uma entrada para cada. Para uma ordem sem repetição de pessoas, revise a lista antes de começar e elimine duplicatas; remover uma vitória não apaga todas as linhas com o mesmo texto."
      },
      "useCases": {
        "title": "Escolhas informais com regras compreensíveis",
        "items": [
          "Em sala de aula, escolha quem começa a apresentar um trabalho com uma linha por aluno. Combine a regra de remoção antes da atividade e acompanhe os participantes que ainda faltam; a roleta não organiza uma lista final automaticamente.",
          "Em uma equipe, escolha qual tema será discutido primeiro. Repita opções somente se esse peso for intencional e conhecido; mais linhas de uma opção aumentam sua participação na seleção, não garantem que ela vencerá.",
          "Para uma rodada de apresentações, remova cada ocorrência vencedora. Quando restar uma única entrada, a roleta não gira: essa pessoa pode receber o último turno diretamente. O histórico mostra só os dez vencedores recentes da sessão."
        ]
      },
      "notes": {
        "title": "O que a lista e a animação realmente significam",
        "items": [
          "A seleção escolhe um índice com crypto.getRandomValues do navegador antes da animação. A animação apresenta o índice escolhido; não é uma medição física de uma roda e não fornece certificação de sorteio.",
          "Entradas repetidas não são deduplicadas. Ana e ana também são textos distintos. Duas linhas iguais em quatro dão a esse texto peso 2/4; a escolha é por ocorrência, não por pessoa identificada.",
          "Remover o vencedor elimina uma ocorrência, não todos os homônimos. Editar ou embaralhar a lista invalida o resultado anterior para remoção; confira a lista atual antes de continuar.",
          "A ferramenta é limitada a decisões informais. Não serve para sorteios regulamentados, promoções ou auditorias; não oferece verificação de identidade, registro auditável, comprovação de regras ou certificação de resultados.",
          "Nomes longos são abreviados na roda, mas o painel conserva o texto completo. Limpar lista não é Limpar histórico; o histórico tem limite de dez itens e não é um registro persistente ou uma ordem completa de participantes."
        ]
      },
      "faq": {
        "title": "Perguntas frequentes",
        "items": [
          {
            "question": "Por que uma pessoa parece ter mais chances que outra?",
            "answer": "Confira as linhas válidas, não apenas os nomes distintos. Cada ocorrência tem uma fatia igual. Se Ana aparecer duas vezes e Bruno uma, a lista tem três entradas e Ana ocupa 2/3. Embaralhar não altera a quantidade de ocorrências."
          },
          {
            "question": "Remover o vencedor impede essa pessoa de ganhar novamente?",
            "answer": "Só se não houver outra ocorrência dela. O botão remove o índice que venceu e gira novamente quando ficam pelo menos duas entradas. Com duplicatas ou nomes escritos de outro modo, a pessoa pode continuar na lista; a ferramenta não identifica pessoas."
          },
          {
            "question": "Por que não consigo girar depois da última remoção?",
            "answer": "A roleta exige pelo menos duas entradas válidas e aceita no máximo 100. Com uma entrada restante, atribua o último turno diretamente se essa for a regra da atividade. Linhas vazias não contam, mas duplicatas contam para o limite."
          },
          {
            "question": "O histórico comprova um sorteio ou uma ordem completa?",
            "answer": "Não. Ele mostra até dez vencedores recentes na sessão, inclusive repetições, e pode ser limpo. Não é uma trilha de auditoria nem comprovação para sorteios regulamentados ou promoções. Use a ferramenta apenas para escolhas informais acordadas pelo grupo."
          }
        ]
      },
      "relatedTools": {
        "title": "Ferramentas relacionadas",
        "items": [
          {
            "toolId": "calculadora",
            "label": "Calculadora",
            "description": "Calcule o tempo por apresentação ao dividir a duração disponível entre os participantes."
          },
          {
            "toolId": "gerador-de-qr-code",
            "label": "Gerador de QR Code",
            "description": "Compartilhe o link dos materiais da apresentação com um QR testado antes da atividade."
          }
        ]
      }
    },
    "en": {
      "howTo": {
        "title": "How to use the wheel of names",
        "steps": [
          "Put one name or option on each line and check the count: blank lines are ignored and leading/trailing spaces are removed. You need 2 to 100 valid entries, including repeats; review duplicates before spinning.",
          "Agree on the activity rule with the group. One occurrence per person gives each person one slice; repeating a name gives it more slices. Shuffle changes visual order but does not remove duplicates or change proportional weight.",
          "Select Spin the wheel and read the full name in the result panel. Spin again keeps the list; Remove the winner and spin deletes only the selected occurrence and starts another choice if at least two entries remain."
        ]
      },
      "example": {
        "title": "A presentation order with a duplicate",
        "description": "For a team presentation, enter Ana, Ana, Bruno, and Carla on four lines. There are four entries but only three distinct names.",
        "calculation": "Ana: 2/4; Bruno: 1/4; Carla: 1/4",
        "result": "Ana occupies half the slices. If Ana wins and you remove the selected occurrence, Ana, Bruno, and Carla remain with one entry each. For an order without repeated people, review the list and remove duplicates before starting; removing one win does not delete every line with the same text."
      },
      "useCases": {
        "title": "Informal choices with understandable rules",
        "items": [
          "In a classroom, choose who starts presenting a project with one line per student. Agree on removal rules first and track who still needs a turn; the wheel does not automatically assemble a final ordered list.",
          "In a team, choose which discussion topic comes first. Repeat options only when that weighting is intentional and known; extra lines increase an option's share of selection, but do not guarantee a win.",
          "For a presentation round, remove each winning occurrence. When one entry remains, the wheel cannot spin: that person can receive the final turn directly. History shows only the ten most recent winners in the session."
        ]
      },
      "notes": {
        "title": "What the list and animation actually mean",
        "items": [
          "Selection chooses an index using browser crypto.getRandomValues before the animation. The animation presents that index; it is not a physical wheel measurement and provides no draw certification.",
          "Repeated entries are not deduplicated. Ana and ana are also distinct text values. Two identical lines out of four give that text a 2/4 weight; selection is by occurrence, not by an identified person.",
          "Removing a winner deletes one occurrence, not everyone with the same name. Editing or shuffling invalidates the previous result for removal; check the current list before continuing.",
          "The tool is limited to informal decisions. It is not for regulated prize draws, promotions, or audits; it provides no identity verification, auditable record, proof of rules, or result certification.",
          "Long names are shortened on the wheel, but the panel keeps their full text. Clear list is different from Clear history; history is capped at ten items and is not a persistent record or a complete participant order."
        ]
      },
      "faq": {
        "title": "Frequently asked questions",
        "items": [
          {
            "question": "Why does one person seem to have better odds?",
            "answer": "Check valid lines, not just distinct names. Each occurrence gets an equal slice. If Ana appears twice and Bruno once, there are three entries and Ana occupies 2/3. Shuffling does not change occurrence counts."
          },
          {
            "question": "Does removing the winner prevent that person from winning again?",
            "answer": "Only if no other occurrence remains. The button removes the winning index and spins again when at least two entries are left. Duplicates or differently written names can keep a person in the list; the tool does not identify people."
          },
          {
            "question": "Why can I not spin after the last removal?",
            "answer": "The wheel needs at least two valid entries and accepts no more than 100. With one entry left, assign the final turn directly if that is the activity rule. Blank lines do not count, but duplicates count toward the limit."
          },
          {
            "question": "Does history prove a draw or show a complete order?",
            "answer": "No. It shows up to ten recent winners in the session, including repeats, and can be cleared. It is not an audit trail or proof for regulated prize draws or promotions. Use the tool only for informal choices agreed by the group."
          }
        ]
      },
      "relatedTools": {
        "title": "Related tools",
        "items": [
          {
            "toolId": "calculadora",
            "label": "Calculator",
            "description": "Calculate time per presentation by dividing the available duration among participants."
          },
          {
            "toolId": "gerador-de-qr-code",
            "label": "QR Code Generator",
            "description": "Share a link to presentation materials with a QR code tested before the activity."
          }
        ]
      }
    },
    "es": {
      "howTo": {
        "title": "Cómo usar la ruleta de nombres",
        "steps": [
          "Escribe un nombre u opción por línea y comprueba el recuento: se ignoran líneas vacías y se eliminan espacios iniciales y finales. Se necesitan de 2 a 100 entradas válidas, incluidas repeticiones; revisa duplicados antes de girar.",
          "Acuerda la regla de la actividad con el grupo. Una aparición por persona da una porción a cada una; repetir un nombre le da más porciones. Mezclar cambia el orden visual, no elimina duplicados ni cambia ese peso proporcional.",
          "Pulsa Girar la ruleta y lee el nombre completo en el panel. Girar de nuevo mantiene la lista; Eliminar al ganador y girar borra solo la aparición elegida e inicia otra selección si quedan al menos dos entradas."
        ]
      },
      "example": {
        "title": "Un orden de presentación con un duplicado",
        "description": "Para una presentación de equipo, introduce Ana, Ana, Bruno y Carla en cuatro líneas. Hay cuatro entradas, aunque solo tres nombres distintos.",
        "calculation": "Ana: 2/4; Bruno: 1/4; Carla: 1/4",
        "result": "Ana ocupa la mitad de las porciones. Si gana Ana y eliminas la aparición elegida, quedan Ana, Bruno y Carla con una entrada cada uno. Para un orden sin repetir personas, revisa y elimina duplicados antes de empezar; eliminar una victoria no borra todas las líneas con el mismo texto."
      },
      "useCases": {
        "title": "Elecciones informales con reglas comprensibles",
        "items": [
          "En clase, elige quién empieza a presentar un trabajo con una línea por alumno. Acuerda primero las reglas de eliminación y lleva el seguimiento de quienes faltan; la ruleta no construye automáticamente una lista final ordenada.",
          "En un equipo, elige qué tema se discutirá primero. Repite opciones solo si ese peso es intencional y conocido; más líneas aumentan su participación en la selección, no garantizan que ganará.",
          "Para una ronda de presentaciones, elimina cada aparición ganadora. Cuando queda una entrada, la ruleta no gira: esa persona puede recibir directamente el último turno. El historial muestra solo los diez ganadores recientes de la sesión."
        ]
      },
      "notes": {
        "title": "Qué significan la lista y la animación",
        "items": [
          "La selección elige un índice con crypto.getRandomValues del navegador antes de animar. La animación muestra ese índice; no mide una rueda física ni proporciona certificación de sorteo.",
          "Las entradas repetidas no se deduplican. Ana y ana también son textos distintos. Dos líneas iguales entre cuatro dan a ese texto peso 2/4; se elige una aparición, no una persona identificada.",
          "Eliminar al ganador borra una aparición, no todos los nombres iguales. Editar o mezclar invalida el resultado anterior para eliminarlo; comprueba la lista actual antes de continuar.",
          "La herramienta se limita a decisiones informales. No sirve para sorteos regulados, promociones ni auditorías; no ofrece verificación de identidad, registro auditable, comprobación de reglas o certificación de resultados.",
          "Los nombres largos se abrevian en la rueda, pero el panel conserva el texto completo. Limpiar lista es distinto de Limpiar historial; el historial tiene un máximo de diez elementos y no es un registro persistente ni un orden completo de participantes."
        ]
      },
      "faq": {
        "title": "Preguntas frecuentes",
        "items": [
          {
            "question": "¿Por qué una persona parece tener más posibilidades?",
            "answer": "Comprueba las líneas válidas, no solo los nombres distintos. Cada aparición tiene una porción igual. Si Ana aparece dos veces y Bruno una, hay tres entradas y Ana ocupa 2/3. Mezclar no cambia la cantidad de apariciones."
          },
          {
            "question": "¿Eliminar al ganador impide que esa persona vuelva a ganar?",
            "answer": "Solo si no queda otra aparición. El botón elimina el índice ganador y gira de nuevo cuando quedan al menos dos entradas. Duplicados o nombres escritos de otra manera pueden mantener a la persona en la lista; la herramienta no identifica personas."
          },
          {
            "question": "¿Por qué no puedo girar tras la última eliminación?",
            "answer": "La ruleta exige al menos dos entradas válidas y admite un máximo de 100. Con una restante, asigna directamente el último turno si esa es la regla acordada. Las líneas vacías no cuentan, pero los duplicados sí cuentan para el límite."
          },
          {
            "question": "¿El historial demuestra un sorteo o un orden completo?",
            "answer": "No. Muestra hasta diez ganadores recientes en la sesión, incluidas repeticiones, y puede limpiarse. No es una pista de auditoría ni prueba para sorteos regulados o promociones. Úsala solo para elecciones informales acordadas por el grupo."
          }
        ]
      },
      "relatedTools": {
        "title": "Herramientas relacionadas",
        "items": [
          {
            "toolId": "calculadora",
            "label": "Calculadora",
            "description": "Calcula el tiempo por presentación dividiendo la duración disponible entre participantes."
          },
          {
            "toolId": "gerador-de-qr-code",
            "label": "Generador de códigos QR",
            "description": "Comparte el enlace a los materiales con un QR probado antes de la actividad."
          }
        ]
      }
    }
  }
};

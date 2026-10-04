import type { ToolEditorialContentCatalog } from "./types";

export const calculatorsEditorialContent: ToolEditorialContentCatalog = {
"calculadora": {
  "pt-BR": {
    "howTo": {
      "title": "Como usar a calculadora",
      "steps": [
        "Monte a expressão pelas teclas numéricas e por +, −, × ou ÷. O visor é somente leitura: não há digitação direta, colagem nem teclas de parênteses ou porcentagem. Use ponto para decimais.",
        "Antes de selecionar =, confira a expressão inteira. Multiplicação e divisão precedem soma e subtração; operações de mesma precedência seguem da esquerda para a direita. Não presuma que a conta será resolvida na ordem dos cliques.",
        "Leia o resultado abaixo do visor. = não substitui a expressão pelo resultado; novas teclas continuam a expressão anterior. Use Limpar para reiniciar, pois não há apagar o último dígito, memória ou histórico."
      ]
    },
    "example": {
      "title": "Conferir o total de uma compra sem agrupar pela ordem dos cliques",
      "description": "Para duas caixas com três itens extras por caixa, calcule o subtotal primeiro se você precisar agrupar uma soma. Nesta interface, faça contas separadas porque não há como inserir parênteses.",
      "calculation": "12+8*3 = 36; 12+8 = 20, depois 20*3 = 60",
      "result": "Na primeira expressão, 8*3 é resolvido antes da soma. Para obter 60, confira 20 na primeira conta, selecione Limpar e monte 20*3. O resultado não é transferido automaticamente para a próxima conta."
    },
    "useCases": {
      "title": "Contas que cabem nas quatro operações",
      "items": [
        "Confira quantidades de material: 6*4+2 retorna 26, por exemplo, para seis pacotes de quatro unidades e duas avulsas. Unidades e descrição devem ser conferidas por você; a ferramenta calcula apenas números.",
        "Divida uma quantidade em partes iguais: 84/7 retorna 12. Isso não verifica se uma divisão de objetos inteiros é viável nem arredonda o resultado para uma quantidade de pessoas.",
        "Use a Calculadora de Porcentagem quando precisar interpretar aumentos, descontos e suas bases. A calculadora básica não oferece uma operação percentual automática."
      ]
    },
    "notes": {
      "title": "Precedência, precisão e erros do visor",
      "items": [
        "O ponto é o separador decimal. A sequência 1.5+2.25 retorna 3.75; não use vírgula decimal. Não há escolha de casas decimais nem arredondamento monetário configurável.",
        "Uma expressão incompleta, como 12+, ou um número com dois pontos, como 1..5, mostra expressão inválida. Dividir por zero produz um resultado não finito e exibe erro em vez de um valor utilizável.",
        "O resultado usa números do JavaScript: 0.1+0.2 pode aparecer como 0.30000000000000004. Essa diferença decorre da representação binária; o visor não aplica correção de centavos ou precisão decimal exata.",
        "Não há funções científicas, conversão de unidades, parênteses ou tecla %. O cálculo segue a expressão completa, não um subtotal depois de cada operador. Faça etapas separadas se precisar de um agrupamento que não possa inserir.",
        "A ferramenta serve para conferência aritmética simples e não substitui cálculos financeiros, tributários ou profissionais. Ela não considera regras de juros, impostos, contratos, tolerâncias técnicas nem critérios de arredondamento exigidos pelo seu trabalho."
      ]
    },
    "faq": {
      "title": "Perguntas frequentes",
      "items": [
        {
          "question": "Por que 12+8×3 dá 36 e não 60?",
          "answer": "Multiplicação tem precedência sobre soma: primeiro 8*3=24 e depois 12+24=36. Para somar 12 e 8 antes, calcule 12+8, anote 20, limpe e calcule 20*3. A interface atual não oferece teclas de parênteses."
        },
        {
          "question": "Posso colar uma conta ou usar porcentagem?",
          "answer": "Não. O visor é somente leitura e a entrada é feita pelas teclas disponíveis, sem % ou parênteses. Para calcular descontos e aumentos, abra a Calculadora de Porcentagem e escolha a operação correspondente."
        },
        {
          "question": "Por que aparece uma longa sequência de decimais?",
          "answer": "Algumas frações decimais não têm representação binária exata nos números usados pelo navegador. Não há configuração de precisão ou arredondamento no visor. Se a conta exige centavos exatos ou uma regra profissional, use o procedimento adequado."
        },
        {
          "question": "Como continuo a conta a partir do resultado?",
          "answer": "O resultado aparece em uma área separada; = mantém a expressão original. Anote o resultado, selecione Limpar e monte a nova expressão com esse valor. A interface não tem memória, histórico nem um botão para apagar somente a última tecla."
        }
      ]
    },
    "relatedTools": {
      "title": "Ferramentas relacionadas",
      "items": [
        {
          "toolId": "calculadora-de-porcentagem",
          "label": "Calculadora de Porcentagem",
          "description": "Calcule descontos, aumentos e variações identificando a base percentual correta."
        },
        {
          "toolId": "conversor-de-unidades",
          "label": "Conversor de Unidades",
          "description": "Coloque medidas na mesma unidade antes de comparar ou fazer uma conta numérica."
        }
      ]
    }
  },
  "en": {
    "howTo": {
      "title": "How to use the calculator",
      "steps": [
        "Build an expression with the number keys and +, −, ×, or ÷. The display is read-only: direct typing, pasting, parentheses keys, and a percentage key are not available. Use a period for decimals.",
        "Check the whole expression before selecting =. Multiplication and division precede addition and subtraction; operations with equal precedence run left to right. Do not assume evaluation follows the order in which you clicked the keys.",
        "Read the result below the display. = does not replace the expression with the answer; pressing more keys continues the previous expression. Use Clear to restart, since there is no last-digit deletion, memory, or history."
      ]
    },
    "example": {
      "title": "Check a total without relying on click order",
      "description": "If you need to add two quantities before multiplying them, calculate that subtotal separately. This interface has no way to enter parentheses, so an intended grouping needs separate calculations.",
      "calculation": "12+8*3 = 36; 12+8 = 20, then 20*3 = 60",
      "result": "In the first expression, 8*3 is evaluated before the addition. To obtain 60, check the first answer of 20, select Clear, and build 20*3. The answer is not automatically carried into the next calculation."
    },
    "useCases": {
      "title": "Tasks for the four arithmetic operations",
      "items": [
        "Check material quantities: 6*4+2 returns 26 for six packs of four units and two loose units. You must check units and descriptions yourself; the tool only calculates numbers.",
        "Divide a quantity equally: 84/7 returns 12. This does not check whether splitting whole objects is practical or round an answer to a number of people.",
        "Use Percentage Calculator when you need to interpret increases, discounts, and their bases. The basic calculator does not have an automatic percentage operation."
      ]
    },
    "notes": {
      "title": "Precedence, precision, and display errors",
      "items": [
        "A period is the decimal separator. The expression 1.5+2.25 returns 3.75; do not use a decimal comma. There is no decimal-place setting or configurable currency rounding.",
        "An unfinished expression such as 12+, or a number with two periods such as 1..5, displays an invalid-expression message. Division by zero produces a non-finite result and shows an error instead of a usable value.",
        "Results use JavaScript numbers: 0.1+0.2 can appear as 0.30000000000000004. This comes from binary representation; the display does not apply cent correction or exact decimal arithmetic.",
        "There are no scientific functions, unit conversion, parentheses keys, or % key. Evaluation uses the whole expression, not a subtotal after each operator. Use separate steps for a grouping you cannot enter.",
        "This tool supports basic arithmetic checks and does not replace financial, tax, or professional calculations. It does not account for interest rules, taxes, contracts, engineering tolerances, or rounding policies required for your work."
      ]
    },
    "faq": {
      "title": "Frequently asked questions",
      "items": [
        {
          "question": "Why does 12+8×3 return 36 instead of 60?",
          "answer": "Multiplication precedes addition: first 8*3=24, then 12+24=36. To add 12 and 8 first, calculate 12+8, note 20, clear the display, and calculate 20*3. The current interface has no parentheses keys."
        },
        {
          "question": "Can I paste an expression or use percentages?",
          "answer": "No. The display is read-only and input comes from the available keys, without % or parentheses. For discounts and increases, open Percentage Calculator and choose the operation that matches your question."
        },
        {
          "question": "Why do I see a long decimal result?",
          "answer": "Some decimal fractions have no exact binary representation in the numbers used by the browser. The display has no precision or rounding setting. If you need exact cents or a professional calculation rule, use the appropriate procedure."
        },
        {
          "question": "How do I continue from the answer?",
          "answer": "The answer appears separately and = keeps the original expression. Note the answer, select Clear, and build a new expression with that value. The interface has no memory, history, or button to delete just the last key."
        }
      ]
    },
    "relatedTools": {
      "title": "Related tools",
      "items": [
        {
          "toolId": "calculadora-de-porcentagem",
          "label": "Percentage Calculator",
          "description": "Calculate discounts, increases, and changes using the appropriate percentage base."
        },
        {
          "toolId": "conversor-de-unidades",
          "label": "Unit Converter",
          "description": "Put measurements in the same unit before comparing them or doing arithmetic."
        }
      ]
    }
  },
  "es": {
    "howTo": {
      "title": "Cómo usar la calculadora",
      "steps": [
        "Construye la expresión con las teclas numéricas y +, −, × o ÷. La pantalla es de solo lectura: no permite escribir directamente ni pegar, y no hay teclas de paréntesis o porcentaje. Usa punto para decimales.",
        "Comprueba la expresión completa antes de pulsar =. Multiplicación y división preceden a suma y resta; las operaciones de igual prioridad se resuelven de izquierda a derecha. El orden de los clics no determina el orden del cálculo.",
        "Lee el resultado debajo de la pantalla. = no sustituye la expresión por la respuesta; nuevas teclas continúan la expresión anterior. Usa Limpiar para empezar de nuevo: no hay borrado del último dígito, memoria ni historial."
      ]
    },
    "example": {
      "title": "Comprobar un total sin depender del orden de los clics",
      "description": "Si necesitas sumar dos cantidades antes de multiplicarlas, calcula ese subtotal por separado. La interfaz no permite introducir paréntesis, así que ese agrupamiento requiere cálculos separados.",
      "calculation": "12+8*3 = 36; 12+8 = 20, después 20*3 = 60",
      "result": "En la primera expresión se resuelve 8*3 antes de sumar. Para obtener 60, comprueba 20 en la primera cuenta, pulsa Limpiar y construye 20*3. La respuesta no se traslada automáticamente a la siguiente operación."
    },
    "useCases": {
      "title": "Tareas para las cuatro operaciones",
      "items": [
        "Comprueba cantidades de material: 6*4+2 devuelve 26 para seis paquetes de cuatro unidades y dos sueltas. Debes comprobar unidades y descripciones; la herramienta solo calcula números.",
        "Reparte una cantidad por igual: 84/7 devuelve 12. No comprueba si es viable dividir objetos enteros ni redondea la respuesta a una cantidad de personas.",
        "Utiliza la Calculadora de porcentajes para interpretar aumentos, descuentos y sus bases. La calculadora básica no ofrece una operación porcentual automática."
      ]
    },
    "notes": {
      "title": "Prioridad, precisión y errores de pantalla",
      "items": [
        "El punto separa los decimales. La expresión 1.5+2.25 devuelve 3.75; no uses coma decimal. No hay selección de decimales ni redondeo monetario configurable.",
        "Una expresión incompleta como 12+, o un número con dos puntos como 1..5, muestra un mensaje de expresión no válida. Dividir por cero produce un resultado no finito y muestra un error en lugar de un valor utilizable.",
        "Los resultados usan números de JavaScript: 0.1+0.2 puede aparecer como 0.30000000000000004. Se debe a la representación binaria; la pantalla no corrige céntimos ni aplica aritmética decimal exacta.",
        "No hay funciones científicas, conversión de unidades, teclas de paréntesis ni %. Se evalúa la expresión completa, no un subtotal tras cada operador. Haz pasos separados si necesitas un agrupamiento que no puedes introducir.",
        "La herramienta sirve para comprobaciones aritméticas simples y no sustituye cálculos financieros, tributarios o profesionales. No considera reglas de intereses, impuestos, contratos, tolerancias técnicas ni criterios de redondeo exigidos por tu trabajo."
      ]
    },
    "faq": {
      "title": "Preguntas frecuentes",
      "items": [
        {
          "question": "¿Por qué 12+8×3 devuelve 36 y no 60?",
          "answer": "La multiplicación precede a la suma: primero 8*3=24 y después 12+24=36. Para sumar 12 y 8 antes, calcula 12+8, anota 20, limpia y calcula 20*3. La interfaz actual no tiene teclas de paréntesis."
        },
        {
          "question": "¿Puedo pegar una expresión o usar porcentajes?",
          "answer": "No. La pantalla es de solo lectura y la entrada se realiza con las teclas disponibles, sin % ni paréntesis. Para descuentos y aumentos, abre la Calculadora de porcentajes y elige la operación que corresponde a tu pregunta."
        },
        {
          "question": "¿Por qué aparece un resultado con tantos decimales?",
          "answer": "Algunas fracciones decimales no tienen representación binaria exacta en los números utilizados por el navegador. No hay ajuste de precisión o redondeo. Si necesitas céntimos exactos o una regla profesional, utiliza el procedimiento adecuado."
        },
        {
          "question": "¿Cómo continúo a partir de la respuesta?",
          "answer": "La respuesta aparece en una zona separada y = conserva la expresión original. Anótala, pulsa Limpiar y construye otra expresión con ese valor. No hay memoria, historial ni botón para borrar solo la última tecla."
        }
      ]
    },
    "relatedTools": {
      "title": "Herramientas relacionadas",
      "items": [
        {
          "toolId": "calculadora-de-porcentagem",
          "label": "Calculadora de porcentajes",
          "description": "Calcula descuentos, aumentos y variaciones con la base porcentual correspondiente."
        },
        {
          "toolId": "conversor-de-unidades",
          "label": "Convertidor de unidades",
          "description": "Lleva las medidas a la misma unidad antes de compararlas o realizar operaciones."
        }
      ]
    }
  }
}
,"calculadora-de-datas": {
    "pt-BR": {
      howTo: { title: "Como usar a calculadora de datas", steps: [
        "Para comparar datas, informe uma data inicial e uma final e escolha se quer incluir o último dia.",
        "Para chegar a outra data, informe a data inicial, escolha adicionar ou subtrair e preencha anos, meses, semanas ou dias.",
        "Selecione o botão de cálculo do modo escolhido para ver o resultado e o dia da semana.",
      ] },
      example: { title: "Adicionar duas semanas a 10 de maio de 2024", description: "No modo de períodos, informe 10/05/2024, selecione Adicionar e preencha 2 em Semanas.", calculation: "10/05/2024 + 2 semanas = 24/05/2024", result: "A ferramenta mostra 24 de maio de 2024 e o dia da semana correspondente." },
      useCases: { title: "Quando usar", items: [
        "Medir o intervalo entre duas datas válidas, inclusive em dias e semanas.",
        "Planejar uma data futura ou anterior com anos, meses, semanas e dias.",
        "Conferir o dia da semana de uma data inicial, final ou calculada.",
      ] },
      notes: { title: "Observações e limitações", items: [
        "O modo de intervalo exige que a data final seja igual ou posterior à data inicial; caso contrário, mostra um aviso.",
        "Marcar Incluir o último dia altera a contagem total de dias do intervalo.",
        "No modo de períodos, os campos aceitam apenas números inteiros não negativos; a operação escolhida define se eles são adicionados ou subtraídos.",
      ] },
      faq: { title: "Perguntas frequentes", items: [
        { question: "Quais modos a calculadora oferece?", answer: "Ela calcula a diferença entre duas datas e também adiciona ou subtrai anos, meses, semanas e dias de uma data inicial." },
        { question: "Posso informar a data final antes da inicial?", answer: "Não. O modo de intervalo pede que a data final seja igual ou posterior à inicial." },
        { question: "O que muda ao incluir o último dia?", answer: "Essa opção inclui a data final na contagem total de dias do intervalo." },
        { question: "Posso usar períodos negativos?", answer: "Não. Informe valores não negativos e escolha Subtrair quando quiser voltar no tempo." },
      ] },
      relatedTools: { title: "Ferramentas relacionadas", items: [
        { toolId: "calculadora-de-idade", label: "Calculadora de idade", description: "Calcule a idade entre uma data de nascimento e uma data de referência." },
        { toolId: "calculadora", label: "Calculadora", description: "Faça contas rápidas ao planejar períodos ou quantidades." },
      ] },
    },
    en: {
      howTo: { title: "How to use the date calculator", steps: [
        "To compare dates, enter a start date and an end date, then choose whether to include the last day.",
        "To reach another date, enter the start date, choose add or subtract, and fill in years, months, weeks, or days.",
        "Select the calculate button for the chosen mode to view the result and weekday.",
      ] },
      example: { title: "Add two weeks to May 10, 2024", description: "In period mode, enter May 10, 2024, select Add, and enter 2 in Weeks.", calculation: "May 10, 2024 + 2 weeks = May 24, 2024", result: "The tool displays May 24, 2024 and its corresponding weekday." },
      useCases: { title: "Useful situations", items: [
        "Measure the interval between two valid dates, including days and weeks.",
        "Plan a future or earlier date with years, months, weeks, and days.",
        "Check the weekday for a start date, end date, or calculated date.",
      ] },
      notes: { title: "Notes and limitations", items: [
        "Interval mode requires the end date to be the same as or later than the start date; otherwise it shows a notice.",
        "Selecting Include the last day changes the interval's total day count.",
        "In period mode, fields accept only non-negative integers; the selected operation determines whether they are added or subtracted.",
      ] },
      faq: { title: "Frequently asked questions", items: [
        { question: "Which modes does the calculator provide?", answer: "It calculates the difference between two dates and can also add or subtract years, months, weeks, and days from a start date." },
        { question: "Can I enter an end date before the start date?", answer: "No. Interval mode requires the end date to be the same as or later than the start date." },
        { question: "What does including the last day change?", answer: "That option includes the end date in the interval's total day count." },
        { question: "Can I use negative periods?", answer: "No. Enter non-negative values and select Subtract when you need to move backward in time." },
      ] },
      relatedTools: { title: "Related tools", items: [
        { toolId: "calculadora-de-idade", label: "Age Calculator", description: "Calculate age between a date of birth and a reference date." },
        { toolId: "calculadora", label: "Calculator", description: "Handle quick arithmetic while planning periods or quantities." },
      ] },
    },
    es: {
      howTo: { title: "Cómo usar la calculadora de fechas", steps: [
        "Para comparar fechas, introduce una fecha inicial y una final, y decide si quieres incluir el último día.",
        "Para obtener otra fecha, introduce la fecha inicial, elige sumar o restar y completa años, meses, semanas o días.",
        "Selecciona el botón de cálculo del modo elegido para ver el resultado y el día de la semana.",
      ] },
      example: { title: "Sumar dos semanas al 10 de mayo de 2024", description: "En el modo de períodos, introduce el 10/05/2024, selecciona Sumar y escribe 2 en Semanas.", calculation: "10/05/2024 + 2 semanas = 24/05/2024", result: "La herramienta muestra el 24 de mayo de 2024 y el día de la semana correspondiente." },
      useCases: { title: "Cuándo resulta útil", items: [
        "Medir el intervalo entre dos fechas válidas, incluso en días y semanas.",
        "Planificar una fecha futura o anterior con años, meses, semanas y días.",
        "Comprobar el día de la semana de una fecha inicial, final o calculada.",
      ] },
      notes: { title: "Notas y limitaciones", items: [
        "El modo de intervalo exige que la fecha final sea igual o posterior a la fecha inicial; de lo contrario muestra un aviso.",
        "Marcar Incluir el último día modifica el total de días del intervalo.",
        "En el modo de períodos, los campos aceptan solo números enteros no negativos; la operación elegida determina si se suman o se restan.",
      ] },
      faq: { title: "Preguntas frecuentes", items: [
        { question: "¿Qué modos ofrece la calculadora?", answer: "Calcula la diferencia entre dos fechas y también suma o resta años, meses, semanas y días a una fecha inicial." },
        { question: "¿Puedo introducir una fecha final anterior a la inicial?", answer: "No. El modo de intervalo requiere que la fecha final sea igual o posterior a la inicial." },
        { question: "¿Qué cambia al incluir el último día?", answer: "Esa opción incluye la fecha final en el total de días del intervalo." },
        { question: "¿Puedo usar períodos negativos?", answer: "No. Introduce valores no negativos y selecciona Restar cuando quieras retroceder en el tiempo." },
      ] },
      relatedTools: { title: "Herramientas relacionadas", items: [
        { toolId: "calculadora-de-idade", label: "Calculadora de edad", description: "Calcula la edad entre una fecha de nacimiento y una fecha de referencia." },
        { toolId: "calculadora", label: "Calculadora", description: "Realiza operaciones rápidas al planificar períodos o cantidades." },
      ] },
    },
  }
,"calculadora-de-idade": {
    "pt-BR": {
      howTo: { title: "Como usar a calculadora de idade", steps: [
        "Informe a data de nascimento no primeiro campo.",
        "Confira ou altere a data de referência no segundo campo; ela é preenchida com a data atual ao abrir a ferramenta.",
        "Selecione Calcular idade para ver a idade entre as duas datas e as informações de aniversário.",
      ] },
      example: { title: "Nascimento em 15 de junho de 2000", description: "Use 15/06/2000 como data de nascimento e 15/06/2024 como data de referência.", calculation: "15/06/2000 → 15/06/2024 = 24 anos, 0 meses e 0 dias", result: "Como a referência é explícita, o exemplo não depende da data em que a página é aberta." },
      useCases: { title: "Quando usar", items: [
        "Ver a idade entre uma data de nascimento e uma data de referência escolhida.",
        "Conferir total de dias, meses e semanas aproximados e dia da semana do nascimento.",
        "Consultar a próxima data de aniversário calculada pela ferramenta.",
      ] },
      notes: { title: "Observações e limitações", items: [
        "O resultado depende da data de referência informada. Ao abrir a página, ela recebe a data atual, mas pode ser alterada.",
        "A data de nascimento não pode ser posterior à data de referência.",
        "Use o resultado apenas como apoio informativo; ele não substitui cálculos médicos, jurídicos, oficiais ou previstos em contrato.",
      ] },
      faq: { title: "Perguntas frequentes", items: [
        { question: "Qual data a calculadora usa como referência?", answer: "Ela preenche a data atual ao iniciar, mas você pode informar outra data de referência antes de calcular." },
        { question: "Posso calcular a idade em uma data passada ou futura?", answer: "Sim, desde que a data de referência seja igual ou posterior à data de nascimento." },
        { question: "Quais informações aparecem no resultado?", answer: "A ferramenta mostra idade em anos, meses e dias, totais de dias, meses e semanas aproximados, dia de nascimento e dados do próximo aniversário." },
        { question: "O resultado serve para uso oficial?", answer: "Não. Para situações médicas, jurídicas, oficiais ou contratuais, siga a regra e a documentação aplicáveis." },
      ] },
      relatedTools: { title: "Ferramentas relacionadas", items: [
        { toolId: "calculadora-de-datas", label: "Calculadora de datas", description: "Compare datas ou some e subtraia períodos em um calendário." },
        { toolId: "calculadora", label: "Calculadora", description: "Resolva contas rápidas relacionadas a planejamento e datas." },
      ] },
    },
    en: {
      howTo: { title: "How to use the age calculator", steps: [
        "Enter the date of birth in the first field.",
        "Check or change the reference date in the second field; it is filled with the current date when the tool opens.",
        "Select Calculate age to view the age between the two dates and birthday information.",
      ] },
      example: { title: "Born on June 15, 2000", description: "Use June 15, 2000 as the date of birth and June 15, 2024 as the reference date.", calculation: "June 15, 2000 → June 15, 2024 = 24 years, 0 months, and 0 days", result: "Because the reference date is explicit, this example does not depend on the day the page is opened." },
      useCases: { title: "Useful situations", items: [
        "View age between a date of birth and a chosen reference date.",
        "Check total days, approximate months and weeks, and the birth weekday.",
        "See the next birthday date calculated by the tool.",
      ] },
      notes: { title: "Notes and limitations", items: [
        "The result depends on the reference date entered. When the page opens, that field receives the current date, but you can change it.",
        "The date of birth cannot be later than the reference date.",
        "Use the result as informational support only; it does not replace medical, legal, official, or contractual calculations.",
      ] },
      faq: { title: "Frequently asked questions", items: [
        { question: "Which date does the calculator use as its reference?", answer: "It fills in the current date when it starts, but you can enter a different reference date before calculating." },
        { question: "Can I calculate age on a past or future date?", answer: "Yes, as long as the reference date is the same as or later than the date of birth." },
        { question: "What information appears in the result?", answer: "The tool shows age in years, months, and days, total days, approximate months and weeks, birth weekday, and next-birthday details." },
        { question: "Is the result suitable for official use?", answer: "No. For medical, legal, official, or contractual situations, follow the relevant rules and documentation." },
      ] },
      relatedTools: { title: "Related tools", items: [
        { toolId: "calculadora-de-datas", label: "Date Calculator", description: "Compare dates or add and subtract periods in a calendar." },
        { toolId: "calculadora", label: "Calculator", description: "Handle quick arithmetic for planning and date-related tasks." },
      ] },
    },
    es: {
      howTo: { title: "Cómo usar la calculadora de edad", steps: [
        "Introduce la fecha de nacimiento en el primer campo.",
        "Comprueba o cambia la fecha de referencia en el segundo campo; al abrir la herramienta se completa con la fecha actual.",
        "Selecciona Calcular edad para ver la edad entre ambas fechas y la información del cumpleaños.",
      ] },
      example: { title: "Nacimiento el 15 de junio de 2000", description: "Usa el 15/06/2000 como fecha de nacimiento y el 15/06/2024 como fecha de referencia.", calculation: "15/06/2000 → 15/06/2024 = 24 años, 0 meses y 0 días", result: "Como la fecha de referencia es explícita, el ejemplo no depende del día en que se abre la página." },
      useCases: { title: "Cuándo resulta útil", items: [
        "Ver la edad entre una fecha de nacimiento y una fecha de referencia elegida.",
        "Comprobar el total de días, meses y semanas aproximados y el día de la semana del nacimiento.",
        "Consultar la próxima fecha de cumpleaños calculada por la herramienta.",
      ] },
      notes: { title: "Notas y limitaciones", items: [
        "El resultado depende de la fecha de referencia indicada. Al abrir la página, el campo recibe la fecha actual, pero puedes cambiarla.",
        "La fecha de nacimiento no puede ser posterior a la fecha de referencia.",
        "Usa el resultado solo como apoyo informativo; no sustituye cálculos médicos, jurídicos, oficiales ni contractuales.",
      ] },
      faq: { title: "Preguntas frecuentes", items: [
        { question: "¿Qué fecha usa la calculadora como referencia?", answer: "Al iniciarse completa la fecha actual, pero puedes indicar otra fecha de referencia antes de calcular." },
        { question: "¿Puedo calcular la edad en una fecha pasada o futura?", answer: "Sí, siempre que la fecha de referencia sea igual o posterior a la fecha de nacimiento." },
        { question: "¿Qué información aparece en el resultado?", answer: "La herramienta muestra edad en años, meses y días, total de días, meses y semanas aproximados, día de nacimiento y datos del próximo cumpleaños." },
        { question: "¿El resultado sirve para uso oficial?", answer: "No. Para situaciones médicas, jurídicas, oficiales o contractuales, sigue las reglas y documentos correspondientes." },
      ] },
      relatedTools: { title: "Herramientas relacionadas", items: [
        { toolId: "calculadora-de-datas", label: "Calculadora de fechas", description: "Compara fechas o suma y resta períodos en un calendario." },
        { toolId: "calculadora", label: "Calculadora", description: "Realiza operaciones rápidas para tareas de planificación y fechas." },
      ] },
    },
  },
};

import { ferramentas, type Ferramenta } from "./ferramentas";
import { getToolLocaleRoute } from "./locale-routes";
import type { Locale } from "./locales";

export type EditorialRelatedTool = {
  toolId: Ferramenta["id"];
  label: string;
  description: string;
};

export type ResolvedEditorialRelatedTool = EditorialRelatedTool & {
  href: string;
};

export type ToolEditorialContent = {
  howTo: {
    title: string;
    steps: string[];
  };
  example: {
    title: string;
    description: string;
    calculation: string;
    result: string;
  };
  useCases: {
    title: string;
    items: string[];
  };
  notes: {
    title: string;
    items: string[];
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  relatedTools: {
    title: string;
    items: EditorialRelatedTool[];
  };
};

type ToolEditorialTranslations = Partial<Record<Locale, ToolEditorialContent>>;

export const toolEditorialContent: Partial<Record<Ferramenta["id"], ToolEditorialTranslations>> = {
  "calculadora-de-porcentagem": {
    "pt-BR": {
      howTo: {
        title: "Como usar a calculadora de porcentagem",
        steps: [
          "Digite a porcentagem que deseja encontrar, como 15 para quinze por cento.",
          "Informe o valor de referência sobre o qual a porcentagem será aplicada.",
          "Selecione Calcular para ver o valor correspondente e a fórmula usada.",
        ],
      },
      example: {
        title: "15% de R$ 500",
        description: "Para descobrir o valor de um desconto de 15% em um produto que custa R$ 500, use 15 como porcentagem e 500 como valor.",
        calculation: "15 ÷ 100 × 500 = 75",
        result: "O desconto é de R$ 75. Para chegar ao preço final, subtraia R$ 75 de R$ 500: R$ 425.",
      },
      useCases: {
        title: "Quando esse cálculo ajuda",
        items: [
          "Encontrar o valor de descontos, comissões ou impostos antes de somar ou subtrair o total.",
          "Separar uma parte de uma meta, orçamento ou valor de venda.",
          "Conferir rapidamente quanto uma taxa percentual representa em dinheiro.",
        ],
      },
      notes: {
        title: "Observações e limitações",
        items: [
          "A ferramenta calcula a parcela percentual de um valor. Ela não soma nem subtrai automaticamente essa parcela do total.",
          "Para aumentos e descontos sucessivos, calcule cada etapa sobre a base correta; percentuais não se somam sempre de forma direta.",
          "O resultado não aplica regras específicas de arredondamento, moeda, impostos ou contratos.",
        ],
      },
      faq: {
        title: "Perguntas frequentes",
        items: [
          {
            question: "O que esta calculadora calcula?",
            answer: "Ela encontra quanto uma porcentagem representa de um valor, multiplicando a porcentagem pelo valor de referência e dividindo por 100.",
          },
          {
            question: "Como calculo um desconto?",
            answer: "Calcule a porcentagem sobre o preço original. O resultado é o valor do desconto; depois subtraia esse valor do preço para obter o total com desconto.",
          },
          {
            question: "Como calculo um aumento percentual?",
            answer: "Use a porcentagem e o valor inicial para encontrar o acréscimo. Em seguida, some o acréscimo ao valor inicial.",
          },
          {
            question: "Posso usar valores decimais?",
            answer: "Sim. A calculadora aceita valores decimais para a porcentagem e para o valor de referência.",
          },
        ],
      },
      relatedTools: {
        title: "Ferramentas relacionadas",
        items: [
          {
            toolId: "calculadora",
            label: "Calculadora",
            description: "Some ou subtraia o valor percentual para chegar ao total final.",
          },
          {
            toolId: "conversor-de-moedas",
            label: "Conversor de Moedas",
            description: "Converta um valor depois de calcular descontos, taxas ou comissões.",
          },
        ],
      },
    },
    en: {
      howTo: {
        title: "How to use the percentage calculator",
        steps: [
          "Enter the percentage you want to find, such as 15 for fifteen percent.",
          "Enter the reference value that the percentage applies to.",
          "Select Calculate to see the corresponding amount and the formula used.",
        ],
      },
      example: {
        title: "15% of $500",
        description: "To find the value of a 15% discount on an item priced at $500, enter 15 as the percentage and 500 as the value.",
        calculation: "15 ÷ 100 × 500 = 75",
        result: "The discount is $75. To get the final price, subtract $75 from $500: $425.",
      },
      useCases: {
        title: "Useful situations for this calculation",
        items: [
          "Find the value of a discount, commission, or tax before adding or subtracting it from a total.",
          "Set aside a portion of a goal, budget, or sales amount.",
          "Quickly check how much a percentage-based fee represents in money.",
        ],
      },
      notes: {
        title: "Notes and limitations",
        items: [
          "This tool calculates the percentage portion of a value. It does not automatically add that portion to, or subtract it from, the total.",
          "For consecutive increases or discounts, calculate each step from the correct base; percentages do not always combine by simple addition.",
          "The result does not apply currency formatting, contractual rules, tax rules, or special rounding.",
        ],
      },
      faq: {
        title: "Frequently asked questions",
        items: [
          {
            question: "What does this calculator calculate?",
            answer: "It finds the amount represented by a percentage of a value by multiplying the percentage by the reference value and dividing by 100.",
          },
          {
            question: "How do I calculate a discount?",
            answer: "Calculate the percentage of the original price. That result is the discount amount; subtract it from the price to get the discounted total.",
          },
          {
            question: "How do I calculate a percentage increase?",
            answer: "Use the percentage and the starting value to find the increase. Then add that amount to the starting value.",
          },
          {
            question: "Can I use decimal values?",
            answer: "Yes. The calculator accepts decimal values for both the percentage and the reference value.",
          },
        ],
      },
      relatedTools: {
        title: "Related tools",
        items: [
          {
            toolId: "calculadora",
            label: "Calculator",
            description: "Add or subtract the percentage amount to reach the final total.",
          },
          {
            toolId: "conversor-de-moedas",
            label: "Currency Converter",
            description: "Convert an amount after calculating a discount, fee, or commission.",
          },
        ],
      },
    },
    es: {
      howTo: {
        title: "Cómo usar la calculadora de porcentajes",
        steps: [
          "Escribe el porcentaje que quieres calcular, por ejemplo 15 para quince por ciento.",
          "Introduce el valor de referencia al que se aplicará el porcentaje.",
          "Selecciona Calcular para ver el importe correspondiente y la fórmula utilizada.",
        ],
      },
      example: {
        title: "15% de $500",
        description: "Para conocer el valor de un descuento del 15% en un producto de $500, introduce 15 como porcentaje y 500 como valor.",
        calculation: "15 ÷ 100 × 500 = 75",
        result: "El descuento es de $75. Para obtener el precio final, resta $75 a $500: $425.",
      },
      useCases: {
        title: "Cuándo resulta útil este cálculo",
        items: [
          "Conocer el importe de descuentos, comisiones o impuestos antes de sumarlo o restarlo de un total.",
          "Separar una parte de una meta, un presupuesto o un importe de venta.",
          "Comprobar rápidamente cuánto representa en dinero una tasa porcentual.",
        ],
      },
      notes: {
        title: "Notas y limitaciones",
        items: [
          "La herramienta calcula la parte porcentual de un valor. No suma ni resta esa parte automáticamente del total.",
          "Para aumentos o descuentos consecutivos, calcula cada paso sobre la base correcta; los porcentajes no siempre se combinan con una suma simple.",
          "El resultado no aplica formato de moneda, reglas fiscales, reglas contractuales ni redondeos especiales.",
        ],
      },
      faq: {
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Qué calcula esta herramienta?",
            answer: "Calcula el importe que representa un porcentaje de un valor: multiplica el porcentaje por el valor de referencia y lo divide entre 100.",
          },
          {
            question: "¿Cómo calculo un descuento?",
            answer: "Calcula el porcentaje sobre el precio original. El resultado es el importe del descuento; réstalo del precio para obtener el total con descuento.",
          },
          {
            question: "¿Cómo calculo un aumento porcentual?",
            answer: "Usa el porcentaje y el valor inicial para conocer el incremento. Después suma ese importe al valor inicial.",
          },
          {
            question: "¿Puedo usar valores decimales?",
            answer: "Sí. La calculadora acepta valores decimales tanto para el porcentaje como para el valor de referencia.",
          },
        ],
      },
      relatedTools: {
        title: "Herramientas relacionadas",
        items: [
          {
            toolId: "calculadora",
            label: "Calculadora",
            description: "Suma o resta el importe porcentual para obtener el total final.",
          },
          {
            toolId: "conversor-de-moedas",
            label: "Convertidor de moneda",
            description: "Convierte un importe después de calcular un descuento, una tasa o una comisión.",
          },
        ],
      },
    },
  },
  calculadora: {
    "pt-BR": {
      howTo: { title: "Como usar a calculadora", steps: [
        "Selecione os números e operadores para montar a expressão no visor.",
        "Use parênteses quando quiser definir qual parte da conta deve ser resolvida primeiro.",
        "Selecione = para calcular ou Limpar para começar uma nova expressão.",
      ] },
      example: { title: "Exemplo: (12 + 8) × 3", description: "Digite (12+8)*3 no visor usando as teclas da calculadora.", calculation: "(12 + 8) × 3 = 60", result: "Os parênteses fazem a soma acontecer antes da multiplicação, e o resultado exibido é 60." },
      useCases: { title: "Quando usar", items: [
        "Conferir somas, subtrações, multiplicações e divisões do dia a dia.",
        "Resolver uma conta com mais de uma operação e parênteses.",
        "Fazer uma conta intermediária antes de usar uma ferramenta específica.",
      ] },
      notes: { title: "Observações e limitações", items: [
        "A interface oferece números, ponto decimal, +, −, ×, ÷, parênteses, = e Limpar.",
        "Ela não inclui funções científicas, memória, histórico, porcentagem automática ou conversão de unidades.",
        "Expressões inválidas e resultados que não são números finitos mostram uma mensagem de erro.",
      ] },
      faq: { title: "Perguntas frequentes", items: [
        { question: "Quais operações posso fazer?", answer: "Você pode somar, subtrair, multiplicar, dividir e usar parênteses para organizar a ordem da conta." },
        { question: "Posso usar números decimais?", answer: "Sim. Use o ponto como separador decimal no visor da calculadora." },
        { question: "Por que aparece uma expressão inválida?", answer: "Isso acontece quando a conta está incompleta ou tem uma combinação que não pode ser calculada, como parênteses sem fechamento." },
        { question: "A calculadora guarda minhas contas?", answer: "Não há histórico ou memória de cálculos na interface atual; Limpar remove a expressão mostrada no visor." },
      ] },
      relatedTools: { title: "Ferramentas relacionadas", items: [
        { toolId: "calculadora-de-porcentagem", label: "Calculadora de Porcentagem", description: "Encontre quanto uma porcentagem representa de um valor." },
        { toolId: "conversor-de-unidades", label: "Conversor de Unidades", description: "Converta medidas de comprimento, peso, temperatura e outras unidades." },
      ] },
    },
    en: {
      howTo: { title: "How to use the calculator", steps: [
        "Select numbers and operators to build an expression on the display.",
        "Use parentheses when you need to decide which part of the calculation is evaluated first.",
        "Select = to calculate, or Clear to start a new expression.",
      ] },
      example: { title: "Example: (12 + 8) × 3", description: "Enter (12+8)*3 on the display using the calculator keys.", calculation: "(12 + 8) × 3 = 60", result: "The parentheses make the addition happen before the multiplication, so the displayed result is 60." },
      useCases: { title: "Useful situations", items: [
        "Check everyday additions, subtractions, multiplications, and divisions.",
        "Solve an expression with more than one operation and parentheses.",
        "Work out an intermediate value before using a more specific tool.",
      ] },
      notes: { title: "Notes and limitations", items: [
        "The interface provides numbers, a decimal point, +, −, ×, ÷, parentheses, =, and Clear.",
        "It does not include scientific functions, memory, history, automatic percentages, or unit conversion.",
        "Invalid expressions and results that are not finite numbers display an error message.",
      ] },
      faq: { title: "Frequently asked questions", items: [
        { question: "Which operations can I use?", answer: "You can add, subtract, multiply, divide, and use parentheses to control the order of an expression." },
        { question: "Can I use decimal numbers?", answer: "Yes. Use a period as the decimal separator on the calculator display." },
        { question: "Why does an invalid-expression message appear?", answer: "It appears when a calculation is incomplete or cannot be evaluated, such as when parentheses are left open." },
        { question: "Does the calculator save my calculations?", answer: "The current interface has no calculation history or memory; Clear removes the expression from the display." },
      ] },
      relatedTools: { title: "Related tools", items: [
        { toolId: "calculadora-de-porcentagem", label: "Percentage Calculator", description: "Find the amount represented by a percentage of a value." },
        { toolId: "conversor-de-unidades", label: "Unit Converter", description: "Convert length, weight, temperature, and other measurements." },
      ] },
    },
    es: {
      howTo: { title: "Cómo usar la calculadora", steps: [
        "Selecciona números y operadores para crear la expresión en la pantalla.",
        "Usa paréntesis cuando necesites decidir qué parte de la operación se resuelve primero.",
        "Selecciona = para calcular o Limpiar para empezar una expresión nueva.",
      ] },
      example: { title: "Ejemplo: (12 + 8) × 3", description: "Introduce (12+8)*3 en la pantalla con las teclas de la calculadora.", calculation: "(12 + 8) × 3 = 60", result: "Los paréntesis hacen que la suma se realice antes de la multiplicación, por lo que el resultado mostrado es 60." },
      useCases: { title: "Cuándo resulta útil", items: [
        "Comprobar sumas, restas, multiplicaciones y divisiones cotidianas.",
        "Resolver una expresión con más de una operación y paréntesis.",
        "Obtener un valor intermedio antes de usar una herramienta más específica.",
      ] },
      notes: { title: "Notas y limitaciones", items: [
        "La interfaz incluye números, punto decimal, +, −, ×, ÷, paréntesis, = y Limpiar.",
        "No incluye funciones científicas, memoria, historial, porcentajes automáticos ni conversión de unidades.",
        "Las expresiones no válidas y los resultados que no son números finitos muestran un mensaje de error.",
      ] },
      faq: { title: "Preguntas frecuentes", items: [
        { question: "¿Qué operaciones puedo realizar?", answer: "Puedes sumar, restar, multiplicar, dividir y usar paréntesis para organizar el orden de la expresión." },
        { question: "¿Puedo usar números decimales?", answer: "Sí. Usa el punto como separador decimal en la pantalla de la calculadora." },
        { question: "¿Por qué aparece una expresión no válida?", answer: "Aparece cuando la operación está incompleta o no se puede calcular, por ejemplo si dejas paréntesis sin cerrar." },
        { question: "¿La calculadora guarda mis operaciones?", answer: "La interfaz actual no tiene historial ni memoria de cálculos; Limpiar elimina la expresión de la pantalla." },
      ] },
      relatedTools: { title: "Herramientas relacionadas", items: [
        { toolId: "calculadora-de-porcentagem", label: "Calculadora de porcentajes", description: "Obtén el importe que representa un porcentaje de un valor." },
        { toolId: "conversor-de-unidades", label: "Convertidor de unidades", description: "Convierte longitud, peso, temperatura y otras medidas." },
      ] },
    },
  },
  "calculadora-de-datas": {
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
  },
  "calculadora-de-idade": {
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
  "conversor-de-unidades": {
    "pt-BR": {
      howTo: { title: "Como usar o conversor de unidades", steps: ["Escolha comprimento, peso, temperatura ou volume.", "Selecione as unidades de origem e destino disponíveis.", "Digite um valor e selecione Converter."] },
      example: { title: "Converter 2 quilômetros em metros", description: "Escolha Comprimento, Quilômetro como origem, Metro como destino e informe 2.", calculation: "2 quilômetros × 1.000 = 2.000 metros", result: "O resultado usa o fator fixo definido pela ferramenta." },
      useCases: { title: "O que você pode converter", items: ["Comprimento: metro, quilômetro, centímetro, milímetro, milha, jarda, pé e polegada.", "Peso: quilograma, grama, miligrama, tonelada, libra e onça; volume: litro, mililitro, metro cúbico, galão e xícara.", "Temperatura entre Celsius, Fahrenheit e Kelvin."] },
      notes: { title: "Observações e limitações", items: ["Comprimento, peso e volume usam fatores fixos da própria página; temperatura usa fórmulas entre Celsius, Fahrenheit e Kelvin.", "O resultado é exibido com até oito casas decimais, portanto a apresentação pode arredondar valores longos.", "A ferramenta não oferece categorias ou unidades além das opções mostradas nos seletores."] },
      faq: { title: "Perguntas frequentes", items: [{ question: "Quais categorias estão disponíveis?", answer: "A ferramenta converte comprimento, peso, temperatura e volume." }, { question: "A conversão de temperatura usa o mesmo fator das outras?", answer: "Não. Celsius, Fahrenheit e Kelvin são convertidos por fórmulas específicas; as demais categorias usam fatores de referência." }, { question: "Por que o resultado pode ter menos casas decimais?", answer: "O número é limitado a até oito casas decimais antes de ser exibido." }, { question: "Posso converter área, velocidade ou tempo?", answer: "Não. Essas categorias não fazem parte das opções atuais." }] },
      relatedTools: { title: "Ferramentas relacionadas", items: [{ toolId: "conversor-de-moedas", label: "Conversor de Moedas", description: "Converta valores entre as moedas disponíveis." }, { toolId: "calculadora", label: "Calculadora", description: "Faça contas rápidas com valores convertidos." }] },
    },
    en: {
      howTo: { title: "How to use the unit converter", steps: ["Choose a category: length, weight, temperature, or volume.", "Select the source and destination units available in that category.", "Enter a value and select Convert."] },
      example: { title: "Convert 2 kilometers to meters", description: "Choose Length, select Kilometer as the source and Meter as the destination, then enter 2.", calculation: "2 kilometers × 1,000 = 2,000 meters", result: "The result uses the fixed factor defined by the tool." },
      useCases: { title: "What you can convert", items: ["Length: meter, kilometer, centimeter, millimeter, mile, yard, foot, and inch.", "Weight: kilogram, gram, milligram, ton, pound, and ounce; volume: liter, milliliter, cubic meter, gallon, and cup.", "Temperature between Celsius, Fahrenheit, and Kelvin."] },
      notes: { title: "Notes and limitations", items: ["Length, weight, and volume use fixed factors defined on the page; temperature uses formulas between Celsius, Fahrenheit, and Kelvin.", "The result is displayed with up to eight decimal places, so the presentation can round long values.", "The tool does not provide categories or units beyond the options shown in its selectors."] },
      faq: { title: "Frequently asked questions", items: [{ question: "Which categories are available?", answer: "The tool converts length, weight, temperature, and volume." }, { question: "Does temperature use the same factor as the other conversions?", answer: "No. Celsius, Fahrenheit, and Kelvin use specific formulas; the other categories use reference factors." }, { question: "Why can the result have fewer decimal places?", answer: "The number is limited to up to eight decimal places before it is displayed." }, { question: "Can I convert area, speed, or time?", answer: "No. Those categories are not part of the current options." }] },
      relatedTools: { title: "Related tools", items: [{ toolId: "conversor-de-moedas", label: "Currency Converter", description: "Convert values between the available currencies." }, { toolId: "calculadora", label: "Calculator", description: "Handle quick arithmetic with converted values." }] },
    },
    es: {
      howTo: { title: "Cómo usar el convertidor de unidades", steps: ["Elige una categoría: longitud, peso, temperatura o volumen.", "Selecciona las unidades de origen y destino disponibles en esa categoría.", "Introduce un valor y selecciona Convertir."] },
      example: { title: "Convertir 2 kilómetros en metros", description: "Elige Longitud, selecciona Kilómetro como origen y Metro como destino e introduce 2.", calculation: "2 kilómetros × 1.000 = 2.000 metros", result: "El resultado usa el factor fijo definido por la herramienta." },
      useCases: { title: "Qué puedes convertir", items: ["Longitud: metro, kilómetro, centímetro, milímetro, milla, yarda, pie y pulgada.", "Peso: kilogramo, gramo, miligramo, tonelada, libra y onza; volumen: litro, mililitro, metro cúbico, galón y taza.", "Temperatura entre Celsius, Fahrenheit y Kelvin."] },
      notes: { title: "Notas y limitaciones", items: ["La longitud, el peso y el volumen usan factores fijos definidos en la página; la temperatura usa fórmulas entre Celsius, Fahrenheit y Kelvin.", "El resultado se muestra con hasta ocho decimales, por lo que la presentación puede redondear valores largos.", "La herramienta no ofrece categorías ni unidades fuera de las opciones de sus selectores."] },
      faq: { title: "Preguntas frecuentes", items: [{ question: "¿Qué categorías están disponibles?", answer: "La herramienta convierte longitud, peso, temperatura y volumen." }, { question: "¿La temperatura usa el mismo factor que las otras conversiones?", answer: "No. Celsius, Fahrenheit y Kelvin se convierten con fórmulas específicas; las demás categorías usan factores de referencia." }, { question: "¿Por qué el resultado puede tener menos decimales?", answer: "El número se limita a un máximo de ocho decimales antes de mostrarse." }, { question: "¿Puedo convertir área, velocidad o tiempo?", answer: "No. Esas categorías no están entre las opciones actuales." }] },
      relatedTools: { title: "Herramientas relacionadas", items: [{ toolId: "conversor-de-moedas", label: "Convertidor de moneda", description: "Convierte importes entre las monedas disponibles." }, { toolId: "calculadora", label: "Calculadora", description: "Realiza operaciones rápidas con valores convertidos." }] },
    },
  },
  "conversor-de-moedas": {
    "pt-BR": {
      howTo: { title: "Como usar o conversor de moedas", steps: ["Escolha as moedas de origem e destino entre as opções disponíveis.", "Digite um valor maior que zero; use o botão central para inverter as moedas se precisar.", "Selecione Converter para consultar a taxa e ver o valor informativo convertido."] },
      example: { title: "Converter um valor sem fixar uma cotação", description: "Escolha BRL como origem, USD como destino e informe, por exemplo, 100. A ferramenta consulta a taxa no momento da conversão.", calculation: "valor informado × taxa retornada pela API = valor convertido", result: "A tela mostra a taxa usada, a data da resposta quando disponível e o valor convertido com duas casas decimais." },
      useCases: { title: "Quando usar", items: ["Consultar uma conversão informativa entre BRL, USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NOK e MXN.", "Comparar um valor em duas moedas antes de planejar uma compra ou orçamento.", "Inverter origem e destino sem redigitar o valor informado."] },
      notes: { title: "Observações e limitações", items: ["Para moedas diferentes, cada conversão consulta `api.frankfurter.dev`; o código não implementa cache nem uma frequência própria de atualização.", "O valor convertido é formatado com duas casas decimais e a taxa com quatro a oito casas. Isso não representa cotação garantida para uma operação financeira.", "Taxas bancárias, impostos, spreads, custos de cartão e outras condições não são calculados. Sem resposta da API, a ferramenta mostra um erro."] },
      faq: { title: "Perguntas frequentes", items: [{ question: "De onde vem a taxa de câmbio?", answer: "A página consulta o endpoint de taxas da API Frankfurter em api.frankfurter.dev para cada conversão entre moedas diferentes." }, { question: "Com que frequência as taxas são atualizadas?", answer: "O código não define frequência nem mantém cache. Ele usa a resposta recebida quando você solicita a conversão e mostra a data retornada pela API, se houver." }, { question: "Funciona sem internet?", answer: "A conversão entre moedas diferentes precisa da resposta da API. Sem ela, a ferramenta exibe uma mensagem de erro." }, { question: "O resultado inclui tarifas e impostos?", answer: "Não. A ferramenta apenas multiplica o valor pela taxa retornada; ela não inclui spreads, tarifas bancárias, impostos ou custos de cartão." }] },
      relatedTools: { title: "Ferramentas relacionadas", items: [{ toolId: "conversor-de-unidades", label: "Conversor de Unidades", description: "Converta medidas com fatores definidos pela ferramenta." }, { toolId: "calculadora-de-porcentagem", label: "Calculadora de Porcentagem", description: "Estime percentuais para comparar taxas ou custos separadamente." }] },
    },
    en: {
      howTo: { title: "How to use the currency converter", steps: ["Choose the source and destination currencies from the available options.", "Enter an amount greater than zero; use the center button to swap currencies if needed.", "Select Convert to request the rate and view the informational converted amount."] },
      example: { title: "Convert an amount without fixing an exchange rate", description: "Choose BRL as the source, USD as the destination, and enter, for example, 100. The tool requests a rate when you convert.", calculation: "entered amount × rate returned by the API = converted amount", result: "The page shows the rate used, the response date when available, and the converted amount with two decimal places." },
      useCases: { title: "Useful situations", items: ["Request an informational conversion among BRL, USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NOK, and MXN.", "Compare an amount in two currencies before planning a purchase or budget.", "Swap source and destination without re-entering the amount."] },
      notes: { title: "Notes and limitations", items: ["For different currencies, every conversion requests `api.frankfurter.dev`; the code does not implement caching or its own update schedule.", "The converted amount is formatted with two decimal places and the rate with four to eight. This is not a guaranteed quote for a financial transaction.", "Bank fees, taxes, spreads, card costs, and other conditions are not calculated. If the API does not respond, the tool displays an error."] },
      faq: { title: "Frequently asked questions", items: [{ question: "Where does the exchange rate come from?", answer: "The page requests the Frankfurter API rate endpoint at api.frankfurter.dev for each conversion between different currencies." }, { question: "How often are rates updated?", answer: "The code does not set an update frequency or keep a cache. It uses the response received when you request a conversion and shows the API date when one is returned." }, { question: "Does it work without an internet connection?", answer: "A conversion between different currencies needs an API response. Without one, the tool displays an error message." }, { question: "Does the result include fees and taxes?", answer: "No. The tool only multiplies the amount by the returned rate; it does not include spreads, bank fees, taxes, or card costs." }] },
      relatedTools: { title: "Related tools", items: [{ toolId: "conversor-de-unidades", label: "Unit Converter", description: "Convert measurements with factors defined by the tool." }, { toolId: "calculadora-de-porcentagem", label: "Percentage Calculator", description: "Estimate percentages to compare rates or costs separately." }] },
    },
    es: {
      howTo: { title: "Cómo usar el convertidor de moneda", steps: ["Elige las monedas de origen y destino entre las opciones disponibles.", "Introduce un importe mayor que cero; usa el botón central para intercambiar las monedas si lo necesitas.", "Selecciona Convertir para consultar la tasa y ver el importe convertido de forma informativa."] },
      example: { title: "Convertir un importe sin fijar una cotización", description: "Elige BRL como origen, USD como destino e introduce, por ejemplo, 100. La herramienta consulta la tasa al convertir.", calculation: "importe introducido × tasa devuelta por la API = importe convertido", result: "La página muestra la tasa usada, la fecha de la respuesta cuando está disponible y el importe convertido con dos decimales." },
      useCases: { title: "Cuándo resulta útil", items: ["Consultar una conversión informativa entre BRL, USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NOK y MXN.", "Comparar un importe en dos monedas antes de planificar una compra o un presupuesto.", "Intercambiar origen y destino sin volver a escribir el importe."] },
      notes: { title: "Notas y limitaciones", items: ["Para monedas diferentes, cada conversión consulta `api.frankfurter.dev`; el código no implementa caché ni una frecuencia propia de actualización.", "El importe convertido se muestra con dos decimales y la tasa con entre cuatro y ocho. No es una cotización garantizada para una operación financiera.", "La herramienta no calcula comisiones bancarias, impuestos, spreads, costes de tarjeta ni otras condiciones. Si la API no responde, muestra un error."] },
      faq: { title: "Preguntas frecuentes", items: [{ question: "¿De dónde procede la tasa de cambio?", answer: "La página consulta el endpoint de tasas de la API Frankfurter en api.frankfurter.dev para cada conversión entre monedas diferentes." }, { question: "¿Con qué frecuencia se actualizan las tasas?", answer: "El código no establece una frecuencia ni mantiene caché. Usa la respuesta recibida al solicitar la conversión y muestra la fecha de la API cuando la respuesta la incluye." }, { question: "¿Funciona sin conexión a internet?", answer: "La conversión entre monedas diferentes necesita una respuesta de la API. Sin ella, la herramienta muestra un mensaje de error." }, { question: "¿El resultado incluye comisiones e impuestos?", answer: "No. La herramienta solo multiplica el importe por la tasa devuelta; no incluye spreads, comisiones bancarias, impuestos ni costes de tarjeta." }] },
      relatedTools: { title: "Herramientas relacionadas", items: [{ toolId: "conversor-de-unidades", label: "Convertidor de unidades", description: "Convierte medidas con factores definidos por la herramienta." }, { toolId: "calculadora-de-porcentagem", label: "Calculadora de porcentajes", description: "Estima porcentajes para comparar tasas o costes por separado." }] },
    },
  },
  "contador-de-palavras": {
    "pt-BR": {
      howTo: { title: "Como usar o contador de palavras", steps: ["Digite ou cole o texto na área de edição.", "Acompanhe as métricas enquanto digita ou selecione Contar.", "Use Limpar para apagar o texto e voltar todas as métricas a zero."] },
      example: { title: "Exemplo: uma frase curta", description: "Digite `Olá mundo.` no campo de texto.", calculation: "2 palavras · 10 caracteres · 1 frase · 1 linha", result: "O espaço e o ponto contam como caracteres; a frase é reconhecida pelo ponto no fim." },
      useCases: { title: "O que a ferramenta mede", items: ["Palavras, separadas por um ou mais espaços, tabulações ou quebras de linha.", "Caracteres, incluindo espaços, pontuação e quebras de linha.", "Frases terminadas por ponto, exclamação ou interrogação e total de linhas." ] },
      notes: { title: "Observações e limitações", items: ["Texto vazio resulta em zero para todas as métricas.", "Espaços e quebras de linha separam palavras; espaços e pontuação continuam contando como caracteres.", "Não há tempo de leitura, análise gramatical, correção ortográfica ou avaliação de qualidade do texto." ] },
      faq: { title: "Perguntas frequentes", items: [{ question: "Como as palavras são contadas?", answer: "O texto é removido das extremidades e dividido por sequências de espaços, tabulações ou quebras de linha." }, { question: "As quebras de linha contam?", answer: "Sim. Cada quebra separa palavras, conta como caractere e cria uma nova linha no total de linhas." }, { question: "Como as frases são identificadas?", answer: "A contagem procura sequências de ponto, exclamação ou interrogação seguidas de espaço ou do fim do texto." }, { question: "Há estimativa de tempo de leitura?", answer: "Não. A interface atual mostra apenas palavras, caracteres, frases e linhas." }] },
      relatedTools: { title: "Ferramentas relacionadas", items: [{ toolId: "comparador-de-texto", label: "Comparador de Texto", description: "Compare duas versões de um texto linha por linha." }, { toolId: "formatador-de-json", label: "Formatador de JSON", description: "Formate ou minifique dados JSON em texto." }] },
    },
    en: {
      howTo: { title: "How to use the word counter", steps: ["Type or paste text into the editing area.", "Follow the metrics while you type, or select Count.", "Use Clear to remove the text and return every metric to zero."] },
      example: { title: "Example: a short sentence", description: "Enter `Hello world.` in the text field.", calculation: "2 words · 12 characters · 1 sentence · 1 line", result: "The space and period count as characters; the sentence is recognized by its ending period." },
      useCases: { title: "What the tool measures", items: ["Words, separated by one or more spaces, tabs, or line breaks.", "Characters, including spaces, punctuation, and line breaks.", "Sentences ending in a period, exclamation mark, or question mark, plus the total number of lines." ] },
      notes: { title: "Notes and limitations", items: ["Empty text results in zero for every metric.", "Spaces and line breaks separate words; spaces and punctuation still count as characters.", "There is no reading-time estimate, grammar analysis, spellcheck, or text-quality assessment." ] },
      faq: { title: "Frequently asked questions", items: [{ question: "How are words counted?", answer: "The text is trimmed at both ends and split on sequences of spaces, tabs, or line breaks." }, { question: "Do line breaks count?", answer: "Yes. Each line break separates words, counts as a character, and creates another line in the line total." }, { question: "How are sentences identified?", answer: "The count looks for sequences of periods, exclamation marks, or question marks followed by whitespace or the end of the text." }, { question: "Is there a reading-time estimate?", answer: "No. The current interface only displays words, characters, sentences, and lines." }] },
      relatedTools: { title: "Related tools", items: [{ toolId: "comparador-de-texto", label: "Text Comparator", description: "Compare two versions of text line by line." }, { toolId: "formatador-de-json", label: "JSON Formatter", description: "Format or minify JSON data as text." }] },
    },
    es: {
      howTo: { title: "Cómo usar el contador de palabras", steps: ["Escribe o pega el texto en el área de edición.", "Consulta las métricas mientras escribes o selecciona Contar.", "Usa Limpiar para borrar el texto y devolver todas las métricas a cero."] },
      example: { title: "Ejemplo: una frase corta", description: "Escribe `Hola mundo.` en el campo de texto.", calculation: "2 palabras · 11 caracteres · 1 frase · 1 línea", result: "El espacio y el punto cuentan como caracteres; la frase se reconoce por el punto final." },
      useCases: { title: "Qué mide la herramienta", items: ["Palabras separadas por uno o más espacios, tabulaciones o saltos de línea.", "Caracteres, incluidos espacios, puntuación y saltos de línea.", "Frases terminadas en punto, exclamación o interrogación y el total de líneas." ] },
      notes: { title: "Notas y limitaciones", items: ["El texto vacío da cero en todas las métricas.", "Los espacios y saltos de línea separan palabras; los espacios y la puntuación siguen contando como caracteres.", "No hay tiempo de lectura, análisis gramatical, corrección ortográfica ni evaluación de calidad del texto." ] },
      faq: { title: "Preguntas frecuentes", items: [{ question: "¿Cómo se cuentan las palabras?", answer: "El texto se recorta en los extremos y se divide por secuencias de espacios, tabulaciones o saltos de línea." }, { question: "¿Cuentan los saltos de línea?", answer: "Sí. Cada salto separa palabras, cuenta como carácter y crea otra línea en el total." }, { question: "¿Cómo se identifican las frases?", answer: "El conteo busca secuencias de punto, exclamación o interrogación seguidas de espacio o del final del texto." }, { question: "¿Hay estimación de tiempo de lectura?", answer: "No. La interfaz actual solo muestra palabras, caracteres, frases y líneas." }] },
      relatedTools: { title: "Herramientas relacionadas", items: [{ toolId: "comparador-de-texto", label: "Comparador de texto", description: "Compara dos versiones de texto línea por línea." }, { toolId: "formatador-de-json", label: "Formateador de JSON", description: "Formatea o minimiza datos JSON como texto." }] },
    },
  },
  "comparador-de-texto": {
    "pt-BR": {
      howTo: { title: "Como usar o comparador de texto", steps: ["Cole a primeira versão no campo Texto original.", "Cole a segunda versão no campo Texto modificado.", "Selecione Comparar para ver as diferenças por linha; Limpar apaga os dois campos e o resultado."] },
      example: { title: "Exemplo: uma linha alterada", description: "Use `A reunião é hoje.` como original e `A reunião é amanhã.` como texto modificado.", calculation: "linha original removida + linha modificada adicionada", result: "A interface mostra a remoção em vermelho e a adição em verde; linhas sem mudança aparecem em cinza." },
      useCases: { title: "Quando usar", items: ["Revisar duas versões de um texto com mudanças de linha.", "Conferir trechos adicionados, removidos e inalterados antes de publicar uma versão.", "Comparar listas, notas ou conteúdo estruturado em linhas." ] },
      notes: { title: "Observações e limitações", items: ["A comparação usa `diffLines` da biblioteca `diff`, portanto trabalha por linhas e não por significado.", "Maiúsculas, pontuação, espaços e outras diferenças no conteúdo de uma linha podem fazer essa linha aparecer como alterada.", "Não há detecção de plágio, comparação semântica, correção automática ou mensagens de erro para campos vazios." ] },
      faq: { title: "Perguntas frequentes", items: [{ question: "Como as diferenças aparecem?", answer: "Linhas adicionadas recebem fundo verde, removidas recebem fundo vermelho e trechos sem alteração aparecem em cinza." }, { question: "A comparação diferencia maiúsculas e pontuação?", answer: "Sim. Como as linhas são comparadas literalmente, mudanças de letras, pontuação ou espaços podem gerar diferença." }, { question: "Posso comparar textos vazios?", answer: "Sim. A ação compara os valores dos campos, inclusive strings vazias; se não houver partes para mostrar, o resultado fica vazio." }, { question: "A ferramenta entende o significado do texto?", answer: "Não. Ela identifica diferenças de linhas com a biblioteca diff, sem análise semântica ou detecção de plágio." }] },
      relatedTools: { title: "Ferramentas relacionadas", items: [{ toolId: "contador-de-palavras", label: "Contador de Palavras", description: "Conte palavras, caracteres, frases e linhas de um texto." }, { toolId: "formatador-de-json", label: "Formatador de JSON", description: "Organize JSON antes de comparar versões estruturadas." }] },
    },
    en: {
      howTo: { title: "How to use the text comparator", steps: ["Paste the first version into the Original text field.", "Paste the second version into the Modified text field.", "Select Compare to view line-based differences; Clear removes both fields and the result."] },
      example: { title: "Example: one changed line", description: "Use `The meeting is today.` as the original and `The meeting is tomorrow.` as the modified text.", calculation: "original line removed + modified line added", result: "The interface shows the removal in red and the addition in green; unchanged lines appear in gray." },
      useCases: { title: "Useful situations", items: ["Review two text versions that contain line changes.", "Check added, removed, and unchanged sections before publishing a version.", "Compare lists, notes, or content structured in lines." ] },
      notes: { title: "Notes and limitations", items: ["The comparison uses `diffLines` from the `diff` library, so it works by lines rather than meaning.", "Capitalization, punctuation, spaces, and other differences within a line can cause that line to appear changed.", "There is no plagiarism detection, semantic comparison, automatic correction, or empty-field error message." ] },
      faq: { title: "Frequently asked questions", items: [{ question: "How are differences displayed?", answer: "Added lines have a green background, removed lines have a red background, and unchanged sections appear in gray." }, { question: "Does the comparison distinguish capitalization and punctuation?", answer: "Yes. Because lines are compared literally, changes to letters, punctuation, or spaces can produce a difference." }, { question: "Can I compare empty text?", answer: "Yes. The action compares the field values, including empty strings; if there are no parts to display, the result remains empty." }, { question: "Does the tool understand text meaning?", answer: "No. It identifies line differences with the diff library, without semantic analysis or plagiarism detection." }] },
      relatedTools: { title: "Related tools", items: [{ toolId: "contador-de-palavras", label: "Word Counter", description: "Count words, characters, sentences, and lines in text." }, { toolId: "formatador-de-json", label: "JSON Formatter", description: "Organize JSON before comparing structured versions." }] },
    },
    es: {
      howTo: { title: "Cómo usar el comparador de texto", steps: ["Pega la primera versión en el campo Texto original.", "Pega la segunda versión en el campo Texto modificado.", "Selecciona Comparar para ver las diferencias por línea; Limpiar borra ambos campos y el resultado."] },
      example: { title: "Ejemplo: una línea modificada", description: "Usa `La reunión es hoy.` como original y `La reunión es mañana.` como texto modificado.", calculation: "línea original eliminada + línea modificada añadida", result: "La interfaz muestra la eliminación en rojo y la adición en verde; las líneas sin cambios aparecen en gris." },
      useCases: { title: "Cuándo resulta útil", items: ["Revisar dos versiones de texto con cambios de línea.", "Comprobar fragmentos añadidos, eliminados y sin cambios antes de publicar una versión.", "Comparar listas, notas o contenido estructurado en líneas." ] },
      notes: { title: "Notas y limitaciones", items: ["La comparación usa `diffLines` de la biblioteca `diff`, por lo que trabaja por líneas y no por significado.", "Mayúsculas, puntuación, espacios y otras diferencias dentro de una línea pueden hacer que aparezca modificada.", "No hay detección de plagio, comparación semántica, corrección automática ni mensaje de error para campos vacíos." ] },
      faq: { title: "Preguntas frecuentes", items: [{ question: "¿Cómo aparecen las diferencias?", answer: "Las líneas añadidas tienen fondo verde, las eliminadas fondo rojo y los fragmentos sin cambios aparecen en gris." }, { question: "¿La comparación distingue mayúsculas y puntuación?", answer: "Sí. Como las líneas se comparan literalmente, los cambios de letras, puntuación o espacios pueden generar una diferencia." }, { question: "¿Puedo comparar texto vacío?", answer: "Sí. La acción compara los valores de los campos, incluso cadenas vacías; si no hay partes que mostrar, el resultado queda vacío." }, { question: "¿La herramienta entiende el significado del texto?", answer: "No. Identifica diferencias de líneas con la biblioteca diff, sin análisis semántico ni detección de plagio." }] },
      relatedTools: { title: "Herramientas relacionadas", items: [{ toolId: "contador-de-palavras", label: "Contador de palabras", description: "Cuenta palabras, caracteres, frases y líneas de un texto." }, { toolId: "formatador-de-json", label: "Formateador de JSON", description: "Organiza JSON antes de comparar versiones estructuradas." }] },
    },
  },
};


Object.assign(toolEditorialContent, {
  "gerador-de-senhas": {
    "pt-BR": { howTo:{title:"Como usar o gerador de senhas",steps:["Defina um tamanho entre 6 e 40 caracteres.","Marque letras mai?sculas, min?sculas, n?meros e/ou s?mbolos.","Selecione Gerar nova senha e use Copiar para lev?-la ? ?rea de transfer?ncia."]}, example:{title:"Exemplo de configura??o",description:"Escolha 16 caracteres com os quatro conjuntos marcados.",calculation:"16 caracteres + mai?sculas + min?sculas + n?meros + s?mbolos",result:"O campo mostra uma senha nova; o valor exibido ? apenas tempor?rio e ilustrativo."}, useCases:{title:"Casos de uso",items:["Criar uma senha diferente para uma nova conta.","Gerar uma senha para um gerenciador de senhas.","Atualizar uma senha que voc? n?o deve reutilizar."]}, notes:{title:"Observa??es e limita??es",items:["A gera??o usa crypto.getRandomValues; ao escolher caracteres por resto da divis?o, o c?digo n?o garante distribui??o perfeitamente uniforme.","A for?a exibida ? apenas uma estimativa: considera somente o tamanho e quantos dos quatro conjuntos est?o selecionados: fraca, forte a partir de 12/3, muito forte a partir de 16/4.","N?o h? confirma??o de requisitos de sites, armazenamento, hist?rico ou garantia de senha inviol?vel."]}, faq:{title:"Perguntas frequentes",items:[{question:"Quais tamanhos est?o dispon?veis?",answer:"O controle vai de 6 a 40 caracteres e come?a em 16."},{question:"Quais caracteres posso incluir?",answer:"Letras A?Z, a?z, d?gitos 0?9 e os s?mbolos mostrados na interface."},{question:"O que acontece sem op??o marcada?",answer:"A senha ? limpa e a interface pede que voc? selecione pelo menos uma op??o."}]}, relatedTools:{title:"Ferramentas relacionadas",items:[{toolId:"uuid-generator",label:"Gerador de UUID",description:"Crie identificadores UUID quando precisar de um identificador, n?o de uma senha."},{toolId:"base64",label:"Base64",description:"Codifique ou decodifique texto em Base64."}]} },
    en: { howTo:{title:"How to use the password generator",steps:["Set a length from 6 to 40 characters.","Choose uppercase, lowercase, numbers, and/or symbols.","Select Generate new password, then Copy to place it on the clipboard."]}, example:{title:"Configuration example",description:"Choose 16 characters with all four character sets selected.",calculation:"16 characters + uppercase + lowercase + numbers + symbols",result:"The field shows a new password; its value is temporary and illustrative only."}, useCases:{title:"Use cases",items:["Create a different password for a new account.","Generate a password for a password manager.","Replace a password that should not be reused."]}, notes:{title:"Notes and limitations",items:["Generation uses crypto.getRandomValues; selecting characters with a remainder does not guarantee a perfectly uniform distribution.","The displayed strength is only an estimate: it considers only length and how many of four sets are selected: weak, strong at 12/3, and very strong at 16/4.","There is no site-requirement check, storage, history, or unbreakable-password guarantee."]}, faq:{title:"Frequently asked questions",items:[{question:"Which lengths are available?",answer:"The control ranges from 6 to 40 characters and starts at 16."},{question:"Which characters can I include?",answer:"A?Z, a?z, 0?9, and the symbols shown in the interface."},{question:"What if nothing is selected?",answer:"The password is cleared and the interface asks you to select at least one option."}]}, relatedTools:{title:"Related tools",items:[{toolId:"uuid-generator",label:"UUID Generator",description:"Create UUID identifiers when you need an identifier, not a password."},{toolId:"base64",label:"Base64",description:"Encode or decode text as Base64."}]} },
    es: { howTo:{title:"C?mo usar el generador de contrase?as",steps:["Define una longitud de 6 a 40 caracteres.","Marca may?sculas, min?sculas, n?meros y/o s?mbolos.","Selecciona Generar contrase?a nueva y usa Copiar."]}, example:{title:"Ejemplo de configuraci?n",description:"Elige 16 caracteres y los cuatro conjuntos.",calculation:"16 caracteres + cuatro conjuntos",result:"El campo muestra una contrase?a nueva; es solo ilustrativa."}, useCases:{title:"Casos de uso",items:["Crear una contrase?a distinta para una cuenta.","Generar una contrase?a para un gestor.","Sustituir una contrase?a que no debes reutilizar."]}, notes:{title:"Notas y limitaciones",items:["Usa crypto.getRandomValues; el resto de divisi?n no garantiza distribuci?n perfectamente uniforme.","La fuerza mostrada es solo una estimaci?n: considera ?nicamente la longitud y los conjuntos: fuerte desde 12/3 y muy fuerte desde 16/4.","No comprueba requisitos de sitios ni garantiza una contrase?a inviolable."]}, faq:{title:"Preguntas frecuentes",items:[{question:"?Qu? longitudes hay?",answer:"De 6 a 40 caracteres; el valor inicial es 16."},{question:"?Qu? caracteres incluye?",answer:"A?Z, a?z, 0?9 y los s?mbolos mostrados."},{question:"?Y si no marco opciones?",answer:"Se borra la contrase?a y se pide seleccionar una opci?n."}]}, relatedTools:{title:"Herramientas relacionadas",items:[{toolId:"uuid-generator",label:"Generador de UUID",description:"Crea UUID cuando necesites un identificador, no una contrase?a."},{toolId:"base64",label:"Base64",description:"Codifica o decodifica texto en Base64."}]} },
  },
  "gerador-de-qr-code": {
    "pt-BR": { howTo:{title:"Como usar o gerador de QR Code",steps:["Digite ou cole um link ou texto no campo.","Selecione Gerar.","Use Baixar QR Code para salvar a imagem PNG." ]}, example:{title:"Exemplo com URL",description:"Digite uma URL fict?cia segura no campo.",calculation:"https://example.com/agenda",result:"A ferramenta cria um QR Code para esse texto e disponibiliza o PNG."}, useCases:{title:"Casos de uso",items:["Compartilhar uma URL em um cartaz.","Transformar um texto curto em QR Code.","Criar um c?digo para leitura por outro dispositivo."]}, notes:{title:"Observa??es e limita??es",items:["Aceita o texto que voc? digitar; a interface n?o possui campos de tipo, cor ou tamanho.","Usa a biblioteca qrcode no navegador, em canvas de 500 px com margem 2, e gera download PNG.","Qualquer pessoa que leia o c?digo pode ver o conte?do codificado; n?o h? recursos de rastreamento, expira??o ou validade permanente."]}, faq:{title:"Perguntas frequentes",items:[{question:"Qual formato ? baixado?",answer:"PNG, com o nome usevo-qrcode.png."},{question:"Posso criar um QR Code vazio?",answer:"N?o. A ferramenta mostra uma mensagem para informar link ou texto."},{question:"H? ajuste de cores?",answer:"N?o h? controles de cor ou tamanho na interface."}]}, relatedTools:{title:"Ferramentas relacionadas",items:[{toolId:"leitor-de-qr-code",label:"Leitor de QR Code",description:"Leia um c?digo por imagem ou c?mera."},{toolId:"url-encoder-decoder",label:"Codificador/Decodificador de URL",description:"Codifique ou decodifique uma URL antes de us?-la."}]} },
    en: { howTo:{title:"How to use the QR Code generator",steps:["Type or paste a link or text.","Select Generate.","Use Download QR Code to save the PNG image."]}, example:{title:"URL example",description:"Enter a safe fictional URL.",calculation:"https://example.com/agenda",result:"The tool creates a QR Code for that text and provides a PNG."}, useCases:{title:"Use cases",items:["Share a URL on a poster.","Turn short text into a QR Code.","Create a code to scan on another device."]}, notes:{title:"Notes and limitations",items:["It accepts the text you enter; there are no type, color, or size fields.","It uses the qrcode library in the browser, on a 500 px canvas with margin 2, and downloads PNG.","Anyone scanning it can read the encoded content; there is no tracking, expiry, or permanent-validity feature."]}, faq:{title:"Frequently asked questions",items:[{question:"Which download format is available?",answer:"PNG, named usevo-qrcode.png."},{question:"Can I create an empty code?",answer:"No. The tool asks for a link or text."},{question:"Can I set colors?",answer:"There are no color or size controls."}]}, relatedTools:{title:"Related tools",items:[{toolId:"leitor-de-qr-code",label:"QR Code Scanner",description:"Read a code from an image or camera."},{toolId:"url-encoder-decoder",label:"URL Encoder/Decoder",description:"Encode or decode a URL before using it."}]} },
    es: { howTo:{title:"C?mo usar el generador de c?digos QR",steps:["Escribe o pega un enlace o texto.","Selecciona Generar.","Usa Descargar c?digo QR para guardar el PNG."]}, example:{title:"Ejemplo de URL",description:"Introduce una URL ficticia segura.",calculation:"https://example.com/agenda",result:"La herramienta crea un QR para ese texto y ofrece un PNG."}, useCases:{title:"Casos de uso",items:["Compartir una URL en un cartel.","Convertir texto corto en QR.","Crear un c?digo para otro dispositivo."]}, notes:{title:"Notas y limitaciones",items:["Acepta el texto introducido; no hay campos de tipo, color o tama?o.","Usa qrcode en el navegador, canvas de 500 px, margen 2 y descarga PNG.","Quien lo lea puede ver el contenido; no hay rastreo, caducidad ni validez permanente."]}, faq:{title:"Preguntas frecuentes",items:[{question:"?Qu? formato se descarga?",answer:"PNG, llamado usevo-qrcode.png."},{question:"?Puedo crear un c?digo vac?o?",answer:"No; pide un enlace o texto."},{question:"?Puedo elegir colores?",answer:"No hay controles de color ni tama?o."}]}, relatedTools:{title:"Herramientas relacionadas",items:[{toolId:"leitor-de-qr-code",label:"Esc?ner de c?digo QR",description:"Lee un c?digo desde imagen o c?mara."},{toolId:"url-encoder-decoder",label:"Codificador/Decodificador de URL",description:"Codifica o decodifica una URL."}]} },
  },
});

const scannerEditorial = (locale: Locale): ToolEditorialContent => { const d=locale==='pt-BR'?['Como usar o leitor de QR Code','Selecione Ler imagem ou Usar c?mera.','Para imagem, arraste, cole ou selecione JPG, PNG ou WebP.','Para c?mera, autorize o navegador e inicie a c?mera.','Exemplo de leitura','Use uma imagem JPG que contenha https://example.com/agenda.','imagem JPG ? conte?do do QR Code','O resultado mostra o conte?do; confira o endere?o antes de abrir links.','Casos de uso','Ler um c?digo recebido em imagem.|Conferir uma URL antes de abri-la.|Ler um QR Code pela c?mera.','Observa??es e limita??es','A c?mera exige HTTPS, dispositivo compat?vel e permiss?o; uma negativa ou aus?ncia de c?mera mostra erro.|Usa BarcodeDetector quando dispon?vel e jsQR como alternativa; n?o garante leitura de toda imagem.|Aceita JPG, PNG e WebP, uma imagem por vez; n?o detecta malware nem valida seguran?a.','Perguntas frequentes','Posso usar c?mera e imagem?|Sim; a interface oferece os dois modos.|Quais arquivos aceita?|JPG, PNG e WebP.|A c?mera precisa de HTTPS?|Sim, o pr?prio c?digo bloqueia contexto inseguro.','Ferramentas relacionadas','Gerador de QR Code','Crie um c?digo para testar a leitura.','Base64','Codifique ou decodifique texto.']:locale==='es'?['C?mo usar el esc?ner de c?digos QR','Selecciona Leer imagen o Usar c?mara.','Para imagen, arrastra, pega o selecciona JPG, PNG o WebP.','Para c?mara, autoriza el navegador e inicia la c?mara.','Ejemplo de lectura','Usa una imagen JPG con https://example.com/agenda.','imagen JPG ? contenido del QR','El resultado muestra el contenido; comprueba la direcci?n antes de abrir enlaces.','Casos de uso','Leer un c?digo de una imagen.|Comprobar una URL antes de abrirla.|Leer un QR con c?mara.','Notas y limitaciones','La c?mara requiere HTTPS, dispositivo compatible y permiso.|Usa BarcodeDetector cuando est? disponible y jsQR como alternativa; no garantiza leer toda imagen.|Acepta JPG, PNG y WebP, una imagen por vez; no detecta malware ni valida seguridad.','Preguntas frecuentes','?Puedo usar c?mara e imagen?|S?, hay dos modos.|?Qu? archivos acepta?|JPG, PNG y WebP.|?La c?mara necesita HTTPS?|S?, el c?digo bloquea un contexto inseguro.','Herramientas relacionadas','Generador de c?digos QR','Crea un c?digo para probar la lectura.','Base64','Codifica o decodifica texto.']:['How to use the QR Code scanner','Select Read image or Use camera.','For an image, drag, paste, or select JPG, PNG, or WebP.','For a camera, allow the browser permission and start it.','Scan example','Use a JPG image containing https://example.com/agenda.','JPG image ? QR Code content','The result shows the content; check an address before opening links.','Use cases','Read a code received as an image.|Check a URL before opening it.|Read a QR Code with the camera.','Notes and limitations','The camera requires HTTPS, a compatible device, and permission.|It uses BarcodeDetector when available and jsQR as a fallback; it cannot guarantee every image will scan.|It accepts JPG, PNG, and WebP, one image at a time; it does not detect malware or validate safety.','Frequently asked questions','Can I use camera and image?|Yes; there are two modes.|Which files are accepted?|JPG, PNG, and WebP.|Does the camera need HTTPS?|Yes, the code blocks an insecure context.','Related tools','QR Code Generator','Create a code to test scanning.','Base64','Encode or decode text.'];const q=d[13].split('|'),u=d[9].split('|'),n=d[11].split('|');return {howTo:{title:d[0],steps:[d[1],d[2],d[3]]},example:{title:d[4],description:d[5],calculation:d[6],result:d[7]},useCases:{title:d[8],items:u},notes:{title:d[10],items:n},faq:{title:d[12],items:[{question:q[0],answer:q[1]},{question:q[2],answer:q[3]},{question:q[4],answer:q[5]}]},relatedTools:{title:d[14],items:[{toolId:'gerador-de-qr-code',label:d[15],description:d[16]},{toolId:'base64',label:d[17],description:d[18]}]}}};
const devEditorial=(locale:Locale,id:'uuid-generator'|'base64'):ToolEditorialContent=>{const uuid=id==='uuid-generator';const en=uuid?['How to use the UUID generator','Select Generate to create one UUID.','Use Copy after a UUID appears.','Generate again for another illustrative value.','UUID example','Select Generate once.','xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx','The displayed value is a version 4 UUID example, not a password or cryptographic mechanism.','Use cases','Create an identifier for a record.|Prepare an ID for development tests.|Copy one UUID at a time.','Notes and limitations','The interface creates one UUID at a time, with no format options or batch generation.|It uses crypto.randomUUID when available; its fallback builds a v4-shaped UUID with Math.random.|UUIDs are not absolutely unique and are not passwords or encryption.','Frequently asked questions','Which UUID version is available?|Version 4.|Can I generate several at once?|No, the interface generates one at a time.|Is a UUID a password?|No.']:['How to use Base64','Enter text in the text field.','Select Text to Base64 or Base64 to text.','Copy the visible result if needed.','Short example','Enter hello and select Text to Base64.','hello ? aGVsbG8=','Decoding aGVsbG8= returns hello. Base64 is encoding, not encryption.','Use cases','Prepare text for a Base64 field.|Decode a Base64 text value.|Check a short encoded example.','Notes and limitations','The interface supports text only; it has no file input or stated maximum size.|It converts Unicode text with encodeURIComponent/unescape and reverses it on decoding.|Empty input and invalid Base64 show messages; Base64 does not provide secrecy or protection.','Frequently asked questions','Does it support files?|No, only text.|Does it handle Unicode?|Yes, it encodes text through UTF-8-compatible browser conversions.|What happens to invalid input?|An invalid-Base64 message is shown.'];const es=uuid?['C?mo usar el generador de UUID','Selecciona Generar para crear un UUID.','Usa Copiar despu?s de que aparezca.','Genera otra vez para otro valor ilustrativo.','Ejemplo de UUID','Selecciona Generar una vez.','xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx','Es un UUID versi?n 4 ilustrativo, no una contrase?a ni criptograf?a.','Casos de uso','Crear un identificador de registro.|Preparar un ID de prueba.|Copiar un UUID cada vez.','Notas y limitaciones','Genera uno por vez, sin formato ni lotes.|Usa crypto.randomUUID si existe; la alternativa crea forma v4 con Math.random.|No hay unicidad absoluta; UUID no es contrase?a ni cifrado.','Preguntas frecuentes','?Qu? versi?n hay?|Versi?n 4.|?Puedo generar varios?|No, uno cada vez.|?Es una contrase?a?|No.']:['C?mo usar Base64','Introduce texto en el campo.','Selecciona Texto a Base64 o Base64 a texto.','Copia el resultado visible si lo necesitas.','Ejemplo corto','Introduce hello y selecciona Texto a Base64.','hello ? aGVsbG8=','Decodificar aGVsbG8= devuelve hello. Base64 es codificaci?n, no cifrado.','Casos de uso','Preparar texto para un campo Base64.|Decodificar texto Base64.|Comprobar un ejemplo corto.','Notas y limitaciones','Solo admite texto; no hay archivos ni tama?o m?ximo indicado.|Convierte Unicode con encodeURIComponent/unescape y lo invierte al decodificar.|Las entradas vac?as o inv?lidas muestran mensajes; Base64 no da secreto ni protecci?n.','Preguntas frecuentes','?Admite archivos?|No, solo texto.|?Maneja Unicode?|S?, usa conversiones del navegador compatibles con UTF-8.|?Qu? pasa si es inv?lido?|Muestra un mensaje de Base64 inv?lido.'];const pt=uuid?['Como usar o gerador de UUID','Selecione Gerar para criar um UUID.','Use Copiar depois que um UUID aparecer.','Gere novamente para outro valor ilustrativo.','Exemplo de UUID','Selecione Gerar uma vez.','xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx','O valor ? um UUID vers?o 4 ilustrativo, n?o uma senha nem mecanismo criptogr?fico.','Casos de uso','Criar identificador de registro.|Preparar um ID de teste.|Copiar um UUID por vez.','Observa??es e limita??es','Gera um UUID por vez, sem formato ou lotes.|Usa crypto.randomUUID se dispon?vel; a alternativa cria formato v4 com Math.random.|N?o h? unicidade absoluta; UUID n?o ? senha nem criptografia.','Perguntas frequentes','Qual vers?o est? dispon?vel?|Vers?o 4.|Posso gerar v?rios?|N?o, um por vez.|? uma senha?|N?o.']:['Como usar Base64','Digite texto no campo.','Selecione Texto para Base64 ou Base64 para Texto.','Copie o resultado vis?vel se necess?rio.','Exemplo curto','Digite hello e selecione Texto para Base64.','hello ? aGVsbG8=','Decodificar aGVsbG8= retorna hello. Base64 ? codifica??o, n?o criptografia.','Casos de uso','Preparar texto para campo Base64.|Decodificar um valor Base64.|Conferir um exemplo curto.','Observa??es e limita??es','A interface aceita apenas texto; n?o h? arquivos ou tamanho m?ximo declarado.|Converte Unicode com encodeURIComponent/unescape e inverte na decodifica??o.|Entrada vazia ou Base64 inv?lido mostra mensagem; Base64 n?o oferece sigilo ou prote??o.','Perguntas frequentes','Aceita arquivos?|N?o, apenas texto.|Trata Unicode?|Sim, usa convers?es do navegador compat?veis com UTF-8.|E entrada inv?lida?|Mostra mensagem de Base64 inv?lido.'];const d=locale==='pt-BR'?pt:locale==='es'?es:en,q=d[13].split('|');return {howTo:{title:d[0],steps:[d[1],d[2],d[3]]},example:{title:d[4],description:d[5],calculation:d[6],result:d[7]},useCases:{title:d[8],items:d[9].split('|')},notes:{title:d[10],items:d[11].split('|')},faq:{title:d[12],items:[{question:q[0],answer:q[1]},{question:q[2],answer:q[3]},{question:q[4],answer:q[5]}]},relatedTools:{title:d[14],items:uuid?[{toolId:'gerador-de-senhas',label:locale==='es'?'Generador de contrase?as':locale==='en'?'Password Generator':'Gerador de Senhas',description:locale==='en'?'Create a password, not an identifier.':'Crie uma senha, n?o um identificador.'},{toolId:'base64',label:'Base64',description:locale==='en'?'Encode or decode text.':'Codifique ou decodifique texto.'}]:[{toolId:'uuid-generator',label:locale==='es'?'Generador de UUID':locale==='en'?'UUID Generator':'Gerador de UUID',description:locale==='en'?'Create an identifier.':'Crie um identificador.'},{toolId:'url-encoder-decoder',label:locale==='es'?'Codificador/Decodificador de URL':locale==='en'?'URL Encoder/Decoder':'Codificador/Decodificador de URL',description:locale==='en'?'Encode or decode a URL.':'Codifique ou decodifique uma URL.'}]}}};
Object.assign(toolEditorialContent,{ 'leitor-de-qr-code':{'pt-BR':scannerEditorial('pt-BR'),en:scannerEditorial('en'),es:scannerEditorial('es')},'uuid-generator':{'pt-BR':devEditorial('pt-BR','uuid-generator'),en:devEditorial('en','uuid-generator'),es:devEditorial('es','uuid-generator')},base64:{'pt-BR':devEditorial('pt-BR','base64'),en:devEditorial('en','base64'),es:devEditorial('es','base64')}});

export const getToolEditorialContent = (
  toolId: Ferramenta["id"] | undefined,
  locale: Locale,
) => toolId ? toolEditorialContent[toolId]?.[locale] : undefined;

export const getToolEditorialContentByLocaleSlug = (
  slug: string | undefined,
  locale: Locale,
) => {
  const tool = ferramentas.find((candidate) => candidate.localeSlugs[locale] === slug);
  return getToolEditorialContent(tool?.id, locale);
};

export const getEditorialRelatedTools = (
  content: ToolEditorialContent | undefined,
  locale: Locale,
): ResolvedEditorialRelatedTool[] => {
  if (!content) return [];

  return content.relatedTools.items.flatMap((item) => {
    const tool = ferramentas.find((candidate) => candidate.id === item.toolId);
    const href = tool ? getToolLocaleRoute(tool, locale) : undefined;
    return href ? [{ ...item, href }] : [];
  });
};

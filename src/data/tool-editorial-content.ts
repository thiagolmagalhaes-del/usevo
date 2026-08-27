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

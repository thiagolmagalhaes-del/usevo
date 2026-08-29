import type { ToolEditorialContentCatalog } from "./types";

export const financeEditorialContent: ToolEditorialContentCatalog = {
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
  }
,"conversor-de-moedas": {
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
};

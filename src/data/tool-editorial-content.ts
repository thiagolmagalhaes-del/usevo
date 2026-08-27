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

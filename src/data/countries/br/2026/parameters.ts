import type { TaxParameter } from "../../../../types/tax";

type ProgressiveBracket = {
  upTo: number | null;
  rate: number;
  deduction?: number;
};

export const br2026CltParameters = {
  taxYear: 2026,
  sources: {
    irrf: {
      label: "Receita Federal — Tributação de 2026",
      url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026",
    },
    inss: {
      label: "INSS — Tabela de contribuição mensal 2026",
      url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal",
    },
  },
  inss: {
    contributionCeiling: 8475.55,
    brackets: [
      { upTo: 1621.0, rate: 0.075 },
      { upTo: 2902.84, rate: 0.09 },
      { upTo: 4354.27, rate: 0.12 },
      { upTo: 8475.55, rate: 0.14 },
    ] satisfies ProgressiveBracket[],
  },
  irrf: {
    brackets: [
      { upTo: 2428.8, rate: 0, deduction: 0 },
      { upTo: 2826.65, rate: 0.075, deduction: 182.16 },
      { upTo: 3751.05, rate: 0.15, deduction: 394.16 },
      { upTo: 4664.68, rate: 0.225, deduction: 675.49 },
      { upTo: null, rate: 0.275, deduction: 908.73 },
    ] satisfies ProgressiveBracket[],
    dependentDeduction: 189.59,
    simplifiedDeductionLimit: 607.2,
    reduction: {
      fullReductionUpTo: 5000,
      partialReductionUpTo: 7350,
      intercept: 978.62,
      coefficient: 0.133145,
    },
  },
} as const;

export const br2026Parameters: Record<string, TaxParameter> = {
  employeeInssContributionCeiling: {
    id: "employee-inss-contribution-ceiling-2026",
    country: "BR",
    taxYear: 2026,
    name: "Teto do salário de contribuição do INSS",
    value: br2026CltParameters.inss.contributionCeiling,
    unit: "currency",
    status: "validated",
    source: `${br2026CltParameters.sources.inss.label}: ${br2026CltParameters.sources.inss.url}`,
    updatedAt: "2026-01-13",
    notes: "Tabela progressiva para empregado, empregado doméstico e trabalhador avulso; teto de contribuição mensal.",
  },
  monthlyIrrfSimplifiedDeduction: {
    id: "monthly-irrf-simplified-deduction-2026",
    country: "BR",
    taxYear: 2026,
    name: "Desconto simplificado mensal do IRRF",
    value: br2026CltParameters.irrf.simplifiedDeductionLimit,
    unit: "currency",
    status: "validated",
    source: `${br2026CltParameters.sources.irrf.label}: ${br2026CltParameters.sources.irrf.url}`,
    updatedAt: "2026-04-27",
    notes: "Tabela mensal, deduções e redução do imposto vigentes a partir de janeiro de 2026.",
  },
  employeeBenefits: {
    id: "employee-benefits",
    country: "BR",
    taxYear: 2026,
    name: "Benefícios do regime CLT",
    value: null,
    unit: "currency",
    status: "needs_review",
    source: "Referência de comparação do MVP atual; fonte oficial não validada neste escopo.",
    updatedAt: "2026-08-17",
    notes: "Benefícios como vale alimentação, plano de saúde e demais itens são entradas do usuário e não uma regra universal fixa.",
  },
  contractorTaxes: {
    id: "contractor-taxes",
    country: "BR",
    taxYear: 2026,
    name: "Impostos estimados do cenário PJ",
    value: null,
    unit: "currency",
    status: "needs_review",
    source: "Parâmetro de entrada do usuário; não foi validado como regra oficial fixa.",
    updatedAt: "2026-08-17",
    notes: "A estimativa do usuário deve ser revisada por especialista antes de decisão oficial.",
  },
  contractorAccounting: {
    id: "contractor-accounting",
    country: "BR",
    taxYear: 2026,
    name: "Contador e custos contábeis",
    value: null,
    unit: "currency",
    status: "needs_review",
    source: "Parâmetro de entrada do usuário; não validado como regra oficial.",
    updatedAt: "2026-08-17",
  },
  contractorBusinessCosts: {
    id: "contractor-business-costs",
    country: "BR",
    taxYear: 2026,
    name: "Outros custos do cenário PJ",
    value: null,
    unit: "currency",
    status: "needs_review",
    source: "Parâmetro de entrada do usuário; não validado como regra oficial.",
    updatedAt: "2026-08-17",
  },
};

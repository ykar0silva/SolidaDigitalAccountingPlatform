"""Gera a planilha de controle financeiro da Sólida (public/downloads/).

Uso (precisa de openpyxl e pillow):
  python scripts/gerar-planilha.py public/downloads/planilha-controle-financeiro-solida.xlsx \
    public/images/logo-principal-sem-fundo.png /tmp/logo-planilha.png
Depois, abra no Excel ou LibreOffice e salve para calcular as fórmulas.
"""
import sys
from datetime import date

from PIL import Image as PILImage
from openpyxl import Workbook
from openpyxl.chart import BarChart, Reference
from openpyxl.comments import Comment
from openpyxl.drawing.image import Image
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

SAIDA, LOGO_ORIG, LOGO_TMP = sys.argv[1], sys.argv[2], sys.argv[3]

AZUL = "0D1B2A"
DOURADO = "D1A875"
DOURADO_ESC = "8C6239"
CREME = "F3EEE6"
ENTRADA = "FFF7E0"  # células para preencher
CINZA = "6B7280"
FONTE = "Arial"
MOEDA = '"R$" #,##0.00;[Red]-"R$" #,##0.00;"-"'
LINHAS = 500  # linhas de lançamentos
PRIMEIRA = 6  # primeira linha de lançamentos
ULTIMA = PRIMEIRA + LINHAS - 1

fina = Side(style="thin", color="E5DED2")
borda = Border(left=fina, right=fina, top=fina, bottom=fina)


def f(size=10, bold=False, color="1F2937", italic=False, underline=False):
    return Font(name=FONTE, size=size, bold=bold, color=color, italic=italic, underline="single" if underline else None)


def faixa_titulo(ws, titulo, subtitulo, ate_col):
    for c in range(1, ate_col + 1):
        for r in (1, 2, 3):
            ws.cell(r, c).fill = PatternFill("solid", fgColor=AZUL)
    ws["A1"] = titulo
    ws["A1"].font = f(16, True, "FFFFFF")
    ws["A2"] = subtitulo
    ws["A2"].font = f(10, False, DOURADO)
    ws.row_dimensions[1].height = 28
    ws.row_dimensions[2].height = 18


def cabecalho(ws, linha, textos, col_ini=1):
    for i, t in enumerate(textos):
        c = ws.cell(linha, col_ini + i, t)
        c.font = f(10, True, "FFFFFF")
        c.fill = PatternFill("solid", fgColor=DOURADO_ESC)
        c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        c.border = borda
    ws.row_dimensions[linha].height = 22


wb = Workbook()

# ------------------------------------------------------------------ Instruções
ins = wb.active
ins.title = "Instruções"
ins.sheet_view.showGridLines = False
for c in range(1, 4):
    for r in range(1, 6):
        ins.cell(r, c).fill = PatternFill("solid", fgColor=AZUL)
ins.column_dimensions["A"].width = 3
ins.column_dimensions["B"].width = 24
ins.column_dimensions["C"].width = 95

logo = PILImage.open(LOGO_ORIG)
logo.thumbnail((360, 200))
logo.save(LOGO_TMP)
img = Image(LOGO_TMP)
img.width, img.height = 180, round(180 * logo.size[1] / logo.size[0])
ins.add_image(img, "B1")
for r in range(1, 6):
    ins.row_dimensions[r].height = 20

ins["B7"] = "Planilha de controle financeiro"
ins["B7"].font = f(18, True, AZUL)
ins["B8"] = "Organize as entradas e saídas da sua empresa e acompanhe o resultado de cada mês."
ins["B8"].font = f(11, False, CINZA)

passos = [
    ("1. Categorias", "Confira a aba Categorias. Ajuste os nomes para a realidade da sua empresa (o tipo Entrada/Saída define onde cada uma soma)."),
    ("2. Lançamentos", "Registre cada entrada e saída com data, descrição, categoria e valor. Use sempre valores positivos: o tipo vem da categoria."),
    ("3. Fluxo mensal", "Informe o ano e o saldo inicial do caixa. O fluxo de cada mês e o saldo acumulado são calculados sozinhos."),
    ("4. Resumo", "Veja o total do ano, o lucro, a margem e o gráfico de entradas e saídas por mês."),
]
r = 10
for titulo, texto in passos:
    t_ = ins.cell(r, 2, titulo)
    t_.font = f(11, True, DOURADO_ESC)
    t_.alignment = Alignment(vertical="top")
    x_ = ins.cell(r, 3, texto)
    x_.font = f(10)
    x_.alignment = Alignment(wrap_text=True, vertical="top")
    ins.row_dimensions[r].height = 30
    r += 1

ins.cell(r + 1, 2, "Legenda").font = f(11, True, AZUL)
leg = ins.cell(r + 2, 2, "Célula para preencher")
leg.fill = PatternFill("solid", fgColor=ENTRADA)
leg.border = borda
leg.font = f(10)
ins.cell(r + 2, 3, "Fundo amarelo-claro: é aqui que você digita.").font = f(10, color=CINZA)
calc = ins.cell(r + 3, 2, "Célula calculada")
calc.border = borda
calc.font = f(10)
ins.cell(r + 3, 3, "Fundo branco: tem fórmula, não precisa mexer.").font = f(10, color=CINZA)

ins.cell(r + 5, 2, "Dica").font = f(11, True, AZUL)
ins.cell(r + 5, 3, "A aba Lançamentos já vem com algumas linhas de exemplo. Apague-as antes de começar a usar.").font = f(10)

ins.cell(r + 7, 2, "Sólida Assessoria Contábil").font = f(11, True, AZUL)
ins.cell(r + 8, 2, "Contabilidade para empresas e MEIs em Palmas-TO, desde 2008.").font = f(10, color=CINZA)
ins.cell(r + 9, 2, "WhatsApp: (63) 3213-3522").font = f(10, color=CINZA)
site = ins.cell(r + 10, 2, "www.solidacontabil.com.br")
site.hyperlink = "https://www.solidacontabil.com.br/"
site.font = f(10, color=DOURADO_ESC, underline=True)
insta = ins.cell(r + 11, 2, "Instagram: @solida.contabilidadeto")
insta.hyperlink = "https://www.instagram.com/solida.contabilidadeto/"
insta.font = f(10, color=DOURADO_ESC, underline=True)

# ------------------------------------------------------------------ Categorias
cat = wb.create_sheet("Categorias")
cat.sheet_view.showGridLines = False
faixa_titulo(cat, "Categorias", "Ajuste os nomes como preferir. O tipo define se a categoria soma como entrada ou saída.", 3)
cabecalho(cat, 5, ["Categoria", "Tipo"])
cat.column_dimensions["A"].width = 34
cat.column_dimensions["B"].width = 14
cat.column_dimensions["C"].width = 40
categorias = [
    ("Vendas de produtos", "Entrada"),
    ("Prestação de serviços", "Entrada"),
    ("Outras receitas", "Entrada"),
    ("Mercadorias e fornecedores", "Saída"),
    ("Salários e encargos", "Saída"),
    ("Pró-labore", "Saída"),
    ("Aluguel e condomínio", "Saída"),
    ("Energia, água e internet", "Saída"),
    ("Impostos", "Saída"),
    ("Contabilidade", "Saída"),
    ("Marketing e divulgação", "Saída"),
    ("Taxas bancárias e maquininha", "Saída"),
    ("Sistemas e softwares", "Saída"),
    ("Manutenção e materiais", "Saída"),
    ("Outras despesas", "Saída"),
]
CAT_INI, CAT_FIM = 6, 25  # 20 vagas
for i in range(CAT_FIM - CAT_INI + 1):
    rr = CAT_INI + i
    nome, tipo = categorias[i] if i < len(categorias) else ("", "")
    a = cat.cell(rr, 1, nome or None)
    b = cat.cell(rr, 2, tipo or None)
    for c in (a, b):
        c.fill = PatternFill("solid", fgColor=ENTRADA)
        c.border = borda
        c.font = f(10)
    b.alignment = Alignment(horizontal="center")
cat["C6"] = "Há linhas livres no fim da lista para novas categorias."
cat["C6"].font = f(9, color=CINZA, italic=True)
dv_tipo = DataValidation(type="list", formula1='"Entrada,Saída"', allow_blank=True)
cat.add_data_validation(dv_tipo)
dv_tipo.add(f"B{CAT_INI}:B{CAT_FIM}")
cat.freeze_panes = "A6"
RANGE_CAT = f"Categorias!$A${CAT_INI}:$A${CAT_FIM}"
RANGE_TIPO = f"Categorias!$B${CAT_INI}:$B${CAT_FIM}"

# ------------------------------------------------------------------ Lançamentos
lan = wb.create_sheet("Lançamentos", 1)
faixa_titulo(lan, "Lançamentos", "Uma linha para cada entrada ou saída de dinheiro. Valores sempre positivos.", 8)
cabecalho(lan, 5, ["Data", "Descrição", "Categoria", "Valor (R$)", "Forma de pagamento", "Tipo", "Mês", "Ano"])
larguras = {"A": 12, "B": 36, "C": 30, "D": 15, "E": 20, "F": 10, "G": 7, "H": 8}
for col, w in larguras.items():
    lan.column_dimensions[col].width = w
lan.freeze_panes = "A6"

exemplos = [
    (date(2026, 11, 3), "Serviço prestado ao cliente A (exemplo)", "Prestação de serviços", 8500, "Pix"),
    (date(2026, 11, 5), "Aluguel da sala (exemplo)", "Aluguel e condomínio", 1800, "Boleto"),
    (date(2026, 11, 5), "Salário da equipe (exemplo)", "Salários e encargos", 3200, "Transferência"),
    (date(2026, 11, 10), "Honorários contábeis (exemplo)", "Contabilidade", 600, "Boleto"),
    (date(2026, 11, 20), "Taxas da maquininha (exemplo)", "Taxas bancárias e maquininha", 180, "Débito em conta"),
]
for i in range(LINHAS):
    rr = PRIMEIRA + i
    ex = exemplos[i] if i < len(exemplos) else None
    vals = list(ex) if ex else [None] * 5
    for j, v in enumerate(vals):
        c = lan.cell(rr, j + 1, v)
        c.fill = PatternFill("solid", fgColor=ENTRADA)
        c.border = borda
        c.font = f(10, color="1F2937" if not ex else "374151")
    lan.cell(rr, 1).number_format = "dd/mm/yyyy"
    lan.cell(rr, 4).number_format = MOEDA
    lan.cell(rr, 6, f'=IF(C{rr}="","",IFERROR(INDEX({RANGE_TIPO},MATCH(C{rr},{RANGE_CAT},0)),"Verificar"))')
    lan.cell(rr, 7, f'=IF(A{rr}="","",MONTH(A{rr}))')
    lan.cell(rr, 8, f'=IF(A{rr}="","",YEAR(A{rr}))')
    for col in (6, 7, 8):
        c = lan.cell(rr, col)
        c.border = borda
        c.font = f(9, color=CINZA)
        c.alignment = Alignment(horizontal="center")

lan["F5"].comment = Comment("Calculado pela categoria (aba Categorias). Se aparecer 'Verificar', a categoria não existe na lista.", "Sólida")
dv_cat = DataValidation(type="list", formula1=f"={RANGE_CAT}", allow_blank=True)
dv_cat.error = "Escolha uma categoria da lista (aba Categorias)."
dv_cat.errorTitle = "Categoria"
lan.add_data_validation(dv_cat)
dv_cat.add(f"C{PRIMEIRA}:C{ULTIMA}")
dv_forma = DataValidation(
    type="list", formula1='"Dinheiro,Pix,Cartão de crédito,Cartão de débito,Boleto,Transferência,Débito em conta"', allow_blank=True
)
dv_forma.showErrorMessage = False  # aceita outras formas também
lan.add_data_validation(dv_forma)
dv_forma.add(f"E{PRIMEIRA}:E{ULTIMA}")
dv_val = DataValidation(type="decimal", operator="greaterThanOrEqual", formula1="0", allow_blank=True)
dv_val.error = "Use valores positivos. Se for uma saída, escolha uma categoria de saída."
lan.add_data_validation(dv_val)
dv_val.add(f"D{PRIMEIRA}:D{ULTIMA}")

# ------------------------------------------------------------------ Fluxo mensal
flu = wb.create_sheet("Fluxo mensal", 2)
flu.sheet_view.showGridLines = False
faixa_titulo(flu, "Fluxo de caixa mensal", "Calculado a partir dos lançamentos. Preencha só o ano e o saldo inicial.", 16)
flu["A4"] = "Ano"
flu["A4"].font = f(10, True, AZUL)
flu["B4"] = 2026
flu["E4"] = "Saldo inicial do caixa (1 de janeiro)"
flu["E4"].font = f(10, True, AZUL)
flu["I4"] = 0
for ref, fmt in (("B4", "0"), ("I4", MOEDA)):
    flu[ref].fill = PatternFill("solid", fgColor=ENTRADA)
    flu[ref].border = borda
    flu[ref].font = f(10, True)
    flu[ref].number_format = fmt
flu["B4"].comment = Comment("Ano que o fluxo vai mostrar. Os lançamentos de outros anos são ignorados.", "Sólida")

MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
cabecalho(flu, 6, ["Categoria", "Tipo"] + MESES + ["Total no ano"])
# linha auxiliar com o número do mês (usada nas fórmulas)
for m in range(12):
    c = flu.cell(5, 3 + m, m + 1)
    c.font = f(8, color="B8AFA0")
    c.alignment = Alignment(horizontal="center")
flu["A5"] = "mês nº"
flu["A5"].font = f(8, color="B8AFA0", italic=True)
flu.column_dimensions["A"].width = 30
flu.column_dimensions["B"].width = 9
for m in range(12):
    flu.column_dimensions[chr(ord("C") + m)].width = 12
flu.column_dimensions["O"].width = 15

R_INI = 7
R_FIM = R_INI + (CAT_FIM - CAT_INI)  # 20 linhas de categoria
L = f"Lançamentos!$D${PRIMEIRA}:$D${ULTIMA}"
LC = f"Lançamentos!$C${PRIMEIRA}:$C${ULTIMA}"
LM = f"Lançamentos!$G${PRIMEIRA}:$G${ULTIMA}"
LA = f"Lançamentos!$H${PRIMEIRA}:$H${ULTIMA}"
for i in range(R_FIM - R_INI + 1):
    rr = R_INI + i
    crow = CAT_INI + i
    flu.cell(rr, 1, f'=IF(Categorias!A{crow}="","",Categorias!A{crow})').font = f(10, color="008000")
    flu.cell(rr, 2, f'=IF(Categorias!B{crow}="","",Categorias!B{crow})').font = f(9, color="008000")
    for m in range(12):
        col = 3 + m
        L_col = chr(ord("C") + m)
        c = flu.cell(rr, col, f'=IF($A{rr}="",0,SUMIFS({L},{LC},$A{rr},{LM},{L_col}$5,{LA},$B$4))')
        c.number_format = MOEDA
        c.font = f(10)
    t = flu.cell(rr, 15, f"=SUM(C{rr}:N{rr})")
    t.number_format = MOEDA
    t.font = f(10, True)
    for col in range(1, 16):
        flu.cell(rr, col).border = borda

linhas_tot = [
    ("Total de entradas", "Entrada"),
    ("Total de saídas", "Saída"),
]
r_ent, r_sai, r_res, r_sal = R_FIM + 2, R_FIM + 3, R_FIM + 4, R_FIM + 5
for rr, (rot, tipo) in zip((r_ent, r_sai), linhas_tot):
    flu.cell(rr, 1, rot).font = f(10, True, AZUL)
    for m in range(13):
        col = 3 + m
        L_col = chr(ord("C") + m)
        c = flu.cell(rr, col, f'=SUMIF($B${R_INI}:$B${R_FIM},"{tipo}",{L_col}{R_INI}:{L_col}{R_FIM})')
        c.number_format = MOEDA
        c.font = f(10, True)
flu.cell(r_res, 1, "Resultado do mês").font = f(10, True, AZUL)
flu.cell(r_sal, 1, "Saldo acumulado do caixa").font = f(10, True, "FFFFFF")
for m in range(13):
    col = 3 + m
    L_col = chr(ord("C") + m)
    c = flu.cell(r_res, col, f"={L_col}{r_ent}-{L_col}{r_sai}")
    c.number_format = MOEDA
    c.font = f(10, True)
for m in range(12):
    col = 3 + m
    L_col = chr(ord("C") + m)
    anterior = "$I$4" if m == 0 else f"{chr(ord('C') + m - 1)}{r_sal}"
    c = flu.cell(r_sal, col, f"={anterior}+{L_col}{r_res}")
    c.number_format = MOEDA
flu.cell(r_sal, 15, f"=N{r_sal}").number_format = MOEDA
for rr in (r_ent, r_sai, r_res, r_sal):
    for col in range(1, 16):
        c = flu.cell(rr, col)
        c.border = borda
        if rr == r_sal:
            c.fill = PatternFill("solid", fgColor=AZUL)
            c.font = f(10, True, "FFFFFF")
        elif rr == r_res:
            c.fill = PatternFill("solid", fgColor=CREME)
flu.freeze_panes = "C7"

# ------------------------------------------------------------------ Resumo
res = wb.create_sheet("Resumo", 1)
res.sheet_view.showGridLines = False
faixa_titulo(res, "Resumo do ano", "Tudo calculado a partir do fluxo mensal.", 8)
res.column_dimensions["A"].width = 3
res.column_dimensions["B"].width = 40
res.column_dimensions["C"].width = 20
indicadores = [
    ("Ano", "='Fluxo mensal'!B4", "0"),
    ("Total de entradas", f"='Fluxo mensal'!O{r_ent}", MOEDA),
    ("Total de saídas", f"='Fluxo mensal'!O{r_sai}", MOEDA),
    ("Resultado (lucro ou prejuízo)", f"='Fluxo mensal'!O{r_res}", MOEDA),
    ("Margem", f"=IFERROR(C8/C6,0)", "0.0%"),
    ("Saldo do caixa no fim do ano", f"='Fluxo mensal'!N{r_sal}", MOEDA),
    ("Média de entradas por mês com movimento", f"=IFERROR(C6/COUNTIF('Fluxo mensal'!C{r_ent}:N{r_ent},\">0\"),0)", MOEDA),
]
for i, (rot, form, fmt) in enumerate(indicadores):
    rr = 5 + i
    a = res.cell(rr, 2, rot)
    a.font = f(10, True, AZUL)
    a.border = borda
    c = res.cell(rr, 3, form)
    c.number_format = fmt
    c.font = f(11, True, "008000" if form.startswith("='Fluxo") else "1F2937")
    c.border = borda
    c.alignment = Alignment(horizontal="right")
res["C8"].fill = PatternFill("solid", fgColor=CREME)
res["B13"] = "Margem = resultado ÷ entradas. Mostra quanto sobra de cada R$ 1 que entra."
res["B13"].font = f(9, color=CINZA, italic=True)

ch = BarChart()
ch.type = "col"
ch.grouping = "clustered"
ch.title = "Entradas e saídas por mês"
ch.y_axis.title = "R$"
ch.y_axis.numFmt = '"R$" #,##0'
ch.height, ch.width = 8.5, 20
dados = Reference(flu, min_col=2, max_col=14, min_row=r_ent, max_row=r_sai)
# séries por linha: rótulo na coluna B não serve (é tipo), então montamos à mão
from openpyxl.chart import Series

for rr, nome, cor in ((r_ent, "Entradas", DOURADO), (r_sai, "Saídas", AZUL)):
    s = Series(Reference(flu, min_col=3, max_col=14, min_row=rr, max_row=rr), title=nome)
    s.graphicalProperties.solidFill = cor
    s.graphicalProperties.line.solidFill = cor
    ch.series.append(s)
ch.set_categories(Reference(flu, min_col=3, max_col=14, min_row=6, max_row=6))
ch.roundedCorners = False
ch.legend.position = "b"
ch.legend.overlay = False
ch.title.overlay = False
ch.y_axis.title.overlay = False
ch.x_axis.delete = False
ch.y_axis.delete = False
res.add_chart(ch, "E5")

# ordem das abas
wb._sheets = [ins, lan, flu, res, cat]
wb.active = 0
for ws in wb.worksheets:
    ws.sheet_properties.tabColor = DOURADO if ws.title != "Instruções" else AZUL
    ws.page_setup.orientation = "landscape"
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
wb.save(SAIDA)
print("ok", SAIDA)

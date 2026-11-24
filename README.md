# Belli Artesanatos — Loja Virtual Profissional

> **Slogan:** *Artes modernas, feitas com carinho.*

Uma loja virtual completa, sofisticada e responsiva para artigos artesanais nobres (crochê, amigurumis, buquês eternos, macramê, velas aromáticas vegetais, decoração e presentes personalizados).

---

## 🎨 Identidade Visual e Paleta Exclusiva
- **Rosa queimado:** `#B87583` (Botões de destaque, destaques principais, acentos)
- **Rosa antigo:** `#D9A6AE` (Bordas suaves, tags, elementos decorativos)
- **Rosa claro:** `#F3E5E3` (Fundo sutil, hover states e destaques)
- **Bege aconchegante:** `#E9D9C9` (Fundos secundários e cartões)
- **Marrom refinado:** `#594744` (Tipografia principal, rodapé e cabeçalhos escuros)
- **Branco puro:** `#FFFFFF` (Superfícies de cartões e contrastes)

---

## 🛍️ Funcionalidades da Loja Pública
1. **Home com Banner Comercial e Chamadas de Ação:**
   - Mensagem afetiva, selos de garantia e botão para catálogo ou encomenda personalizada.
2. **Catálogo Completo com Filtros:**
   - Abas por categoria (Crochê, Amigurumis, Buquês, Macramê, Velas, Bolsas, Decoração, Lembrancinhas).
   - Busca em tempo real por nome e descrição.
   - Ordenação por relevância, menor preço, maior preço e melhor avaliação.
   - Filtro de itens a pronta entrega.
3. **Página/Modal Detalhada de Produtos:**
   - Galeria de imagens com zoom e miniaturas.
   - Ficha técnica completa (Materiais, Dimensões e Cuidados com a peça).
   - Cálculo de parcelamento em até 3x sem juros e desconto no PIX.
   - Botão para compra imediata ou encomenda direta no WhatsApp da loja.
4. **Carrinho de Compras Funcional (Drawer):**
   - Controle dinâmico de quantidade e exclusão de itens.
   - Barra de progresso para Frete Grátis acima de R$ 199,00.
   - Validador de cupons promocionais (`BEMVINDA10`, `AFETO15`, `BELLI20`).
5. **Checkout Completo e Integração com WhatsApp:**
   - Cadastro do cliente e endereço de entrega completo.
   - Opções de pagamento: PIX com chave instantânea, Cartão de Crédito e Boleto.
   - Geração de número de pedido oficial (ex: `BEL-2601`).
   - Botão de envio do pedido formatado em 1 clique direto para o WhatsApp do ateliê.
6. **Depoimentos e Políticas Comerciais:**
   - Avaliações 5 estrelas de clientes reais.
   - Políticas transparentes de frete, trocas, devoluções e cuidados artesanais.

---

## 🛡️ Painel Administrativo `/admin`
Acesse clicando no ícone de escudo na Navbar ou pelo rodapé:
- **Login Protegido:** `admin@belliartesanatos.com.br` / senha: `admin123`
- **Dashboard de Indicadores:** Faturamento Total, Quantidade de Pedidos, Ticket Médio e Alerta de Estoque Baixo.
- **CRUD Completo de Peças:** Cadastrar nova peça com foto, editar preço promocional, gerenciar estoque e remover produtos.
- **Gestão de Pedidos:** Acompanhar compras em tempo real e mudar o status (`Pendente` → `Pago` → `Em Produção` → `Enviado` → `Entregue`).
- **Gestão de Cupons:** Monitorar códigos promocionais ativos.
- **Configurações Gerais:** Atualizar WhatsApp, Chave PIX, valor de frete grátis e redes sociais.

---

## 💾 Persistência e Banco de Dados
- **Client Storage Reativo:** Todo produto cadastrado ou editado no painel reflete instantaneamente em toda a loja através de eventos customizados do browser.
- **Estrutura SQL:** Arquivo `database/schema.sql` pronto para PostgreSQL / Lovable Cloud / Supabase com todas as tabelas, índices e políticas de Row Level Security (RLS).
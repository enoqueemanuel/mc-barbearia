# Revisão antes da publicação — 24/09/2026

## Verificações realizadas

- Layout em 320, 360, 390, 768, 1024, 1280 e 1440 px: sem estouro horizontal da página ou dos controles do cabeçalho após as correções.
- Menu mobile: abrir, selecionar seção, fechar e liberar a rolagem. Ordem igual à Home.
- Logo do cabeçalho: retorna ao início, inclusive saindo da página `/planos`.
- Âncoras da Home: destinos presentes; serviços adicionais permanecem na mesma página.
- Rotas `/`, `/servicos` e `/planos`: carregamento e links de agendamento.
- Galeria: abrir foto, avançar, voltar e fechar com Escape.
- Chat: envio de texto, comparação de preços, dias de uso dos dois planos e fechamento ao seguir um link interno.
- Cards de serviços e avaliações: animação em execução e mudança de posição. Regras de redução de movimento e pausa por foco/hover revisadas no código; a preferência do sistema não foi alterada.
- Agenda externa: seleção de corte e dia, carregamento de profissionais e horários disponíveis. Nenhum horário foi selecionado ou reservado.
- WhatsApp, telefone, Instagram e rotas do Google: destinos configurados revisados; não foram enviados contatos, mensagens ou feitas chamadas.
- Sete verificações automatizadas de comportamento: comparação dos planos, dias, CTA de serviço, ausência de disponibilidade inventada, sábado à noite e horário de São Paulo.
- Lint e build de produção, incluindo TypeScript.

## Correções

- Menu compacto até 1279 px para impedir que o botão de agendamento saia da tela.
- Botões da equipe levam diretamente à agenda, sem a etapa intermediária de WhatsApp. O profissional é escolhido na agenda.
- Planos em telas pequenas: preço sem quebra e selo Premium sem sobreposição ao título.
- Chat: respostas completas sobre ambos os planos, CTA direto de serviço, campo flexível e texto de 16 px no celular, quebra de mensagens longas e anúncio de mensagens para leitores de tela.
- Botões flutuantes e CTA fixo usam o mesmo limite de largura para não se sobreporem em tablets.
- Canonical, sitemap e dados estruturados apontam para o domínio publicado; logo adicionada aos dados estruturados.
- Cálculo do horário usa São Paulo e não anuncia abertura no domingo após sábado. O aviso de aberto/fechado fica oculto enquanto os horários estiverem marcados como provisórios.
- Telefone clicável no rodapé.

## Limites e informações pendentes

- Confirmar os horários de funcionamento e as regras antigas de fidelidade de três meses. A tabela e as regras existentes foram mantidas até confirmação; os benefícios e preços dos planos são os informados pelo cliente.
- Não há API de agenda integrada ao chat. A disponibilidade real é consultada no sistema externo.
- Não foi concluída uma reserva nem testado pagamento, login de cliente ou recebimento real de mensagens.
- Testes responsivos feitos no navegador, não em aparelhos físicos. Teclado virtual de iPhone/Android e navegadores Safari/Firefox não foram testados diretamente.
- Uma revisão funcional reduz atritos, mas não comprova aumento de conversão. Para medir resultados, é necessário acompanhar cliques e reservas efetivamente concluídas, com uma ferramenta de métricas configurada.

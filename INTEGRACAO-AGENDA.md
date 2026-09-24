# Integração do chatbot com Agenda Serviço

Status: pendente de confirmação do fornecedor. Não há consulta de disponibilidade implementada.
Agenda da barbearia: https://agendas.link/macedo
Site do fornecedor consultado: https://aspay.com.br/

O formulário intermediário foi removido. O chat encaminha diretamente à agenda, sem passar pelo WhatsApp para agendamento. Atendimento humano pelo WhatsApp continua disponível separadamente.

## Mensagem para o responsável encaminhar ao suporte

Olá! Estamos desenvolvendo o site da Macedo Barbearia, cuja agenda é https://agendas.link/macedo. Queremos que o chatbot do site consulte os dias e horários realmente disponíveis por serviço e profissional, sem fazer o cliente repetir as escolhas na agenda.

Vocês oferecem API oficial para listar serviços, profissionais e disponibilidade? Podem enviar a documentação e informar como o titular libera o acesso? Essa integração está incluída no plano atual, sem mensalidade adicional?

Caso não haja API, existe um widget oficial ou link que preserve serviço, profissional, data e horário selecionados para concluir o agendamento?

## Dados necessários para implementar

- Documentação oficial e autorização do titular, com credenciais configuradas apenas no servidor.
- Identificação do estabelecimento, serviços e profissionais no sistema.
- Consulta de disponibilidade por data, duração e profissional, com fuso horário definido.
- Forma de continuar ou confirmar o agendamento sem repetir a seleção.
- Revalidação da vaga antes de confirmar, incluindo resposta quando outro cliente ocupar o horário.
- Limites de uso e confirmação de eventuais custos.

Não inferir vagas a partir do horário comercial, manter horários fictícios ou apresentar captura antiga como disponibilidade ao vivo. Não criar uma segunda agenda sem sincronização com o sistema utilizado pela barbearia.

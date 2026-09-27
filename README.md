# agoniadoz

Um painel web que traduz dados climáticos brutos em uma pergunta que todo manauara já se fez: "dá pra sair de casa agora, ou não?"

## O problema

Manaus vive dois extremos que a maioria dos apps de clima trata como estatística fria: calor extremo praticamente o ano inteiro e picos severos de fumaça/poluição por queimadas em determinadas épocas. Números isolados de temperatura ou PM2.5 não comunicam risco real para quem precisa decidir, na prática, se vai treinar na rua, levar o filho pra escola de bicicleta ou adiar uma caminhada.

O agoniadoz existe pra fechar essa distância entre o dado e a decisão: pega temperatura, sensação térmica e concentração de PM2.5 em tempo real e devolve isso como um veredito direto, em linguagem regional, com recomendação de saúde acoplada.

## Demo

`https://manaus-projeto-1ln6n55u4-fabriciodasul.vercel.app/`

## O que o app faz

- Busca temperatura, sensação térmica e PM2.5 em tempo real via API pública (Open-Meteo), sem chave de API e sem backend.
- Classifica automaticamente a condição do clima e a qualidade do ar em faixas (tranquilo / esquentando / muito quente e limpo / atenção / pesado), trocando texto, cor e recomendação de saúde conforme o nível.
- Ajusta a mensagem de clima considerando não só a temperatura, mas também o horário real em Manaus (America/Manaus), evitando alertas que não fazem sentido fora de contexto, como avisar sobre o meio-dia depois que ele já passou.
- Assume um estado "offline" honesto quando a requisição falha, em vez de manter na tela um status "AO VIVO" ou números desatualizados que não refletem a realidade.
- Interface responsiva em Dark Mode, construída com variáveis CSS para consistência visual e fácil manutenção de tema.

## Stack técnica

- HTML5 semântico
- CSS3 (custom properties, Grid, Flexbox, `clamp()` para tipografia fluida, media queries)
- JavaScript puro (ES6+): `fetch`, `async/await`, `Promise.all` para chamadas paralelas, `Intl.DateTimeFormat` para hora com fuso horário correto, manipulação de DOM sem frameworks
- Open-Meteo API (previsão do tempo e qualidade do ar)
- Deploy: Vercel

Sem frameworks, sem bibliotecas de UI, sem build step. A decisão foi deliberada: o projeto serve tanto como ferramenta pública quanto como demonstração de fundamentos sólidos de JavaScript assíncrono e DOM, sem dependências escondendo a lógica.

## Decisões técnicas que valem destacar

**Fuso horário correto, não hora local do navegador.** A lógica de alerta de clima depende de saber que horas são em Manaus, não no dispositivo de quem acessa. Isso é resolvido com `Intl.DateTimeFormat` configurado para `America/Manaus`, evitando o erro comum de usar `new Date().getHours()` e herdar o fuso do sistema operacional do visitante.

**Estado de erro como parte do design, não como afterthought.** Em vez de deixar o app quebrado silenciosamente quando a API falha, o badge "AO VIVO" vira "OFFLINE" de forma visível, e o próximo passo do roadmap é garantir que nenhum número desatualizado permaneça na tela nesse cenário.

**Requisições em paralelo.** Os dados de clima e de qualidade do ar vêm de dois endpoints diferentes da Open-Meteo. Em vez de aguardar um para só então buscar o outro, as duas chamadas rodam simultaneamente com `Promise.all`, reduzindo o tempo até a tela ficar pronta.

## Estrutura do projeto

```
agoniadoz/
├── index.html
├── style.css
├── script.js
└── assets/
    └── images/
        └── logo-agoniadoz.png
```

## Rodando localmente

Não há dependências para instalar. Basta clonar o repositório e abrir o `index.html` em um navegador, ou servir a pasta com qualquer servidor estático simples (ex.: extensão Live Server do VS Code).

```
git clone <url-do-repositorio>
cd agoniadoz
```

## Roadmap

- Substituir valores estáticos de placeholder por indicadores neutros quando os dados reais ainda não chegaram ou falham
- Histórico de leituras ao longo do dia
- Testes automatizados da lógica de classificação de clima e qualidade do ar

## Autor

Fabricio Santos Guimarães
Estudante de Engenharia da Computação — Centro Universitário CEUNI-FAMETRO

LinkedIn: linkedin.com/in/fabricio-guimarães-a058b9409
Email: fabriciodasuldev@gmail.com

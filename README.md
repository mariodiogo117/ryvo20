# RYVO.PT

Website oficial RYVO 2.0: versão estática bilingue (PT-PT e inglês) preparada para Vercel. `index.html` na raiz preserva a preferência de idioma e apresenta metadados sociais para partilhas de `ryvo.pt`; as páginas completas estão em `pt/` e `en/`.

Esta branch foi gerada pelo projeto de origem `RYVO-PHASE4-GATE1/prototype/redesign.mjs` (build de produção). O projeto de origem e os visuais originais estão preservados no pacote local de revisão. Os ficheiros desta branch são o output pronto a publicar, sem dependências de runtime, chaves API ou backend.

## Estado e limitações

- RYVO Open: apenas “Em breve / Coming soon”. Não existem inscrições ou detalhes públicos de torneio.
- Ranking, jogadores e equipas: estados vazios intencionais, sem dados fabricados.
- Contacto: o formulário valida os campos e prepara um email em `geral@ryvo.pt`; o visitante confirma o envio na sua aplicação de correio.
- Não há autenticação, analytics nem recolha de dados por servidor neste website.
- As páginas legais do antigo produto multidesporto foram removidas porque não descrevem o novo website. O texto legal PT/EN requer revisão específica antes de ser publicado.

## Publicação e rollback

O projeto Vercel existente publica automaticamente a branch `main` deste repositório. Primeiro verificar uma branch de preview. Depois de publicar `main`, confirmar as rotas PT/EN, imagens, metadados, 404 e o domínio `ryvo.pt`. Se surgir uma regressão crítica, reverter o commit de lançamento para o commit anterior `15783ff` e confirmar o novo deployment; o snapshot anterior também está preservado no arquivo local `RYVO-LEGACY-WEBSITE-PRE-2.0.zip`.

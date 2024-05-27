# Energy Invoice Reader

Um projeto para leitura de faturas de energia elétrica.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Testes](#testes)
- [Contribuição](#contribuição)

## Instalação

Passos para instalar as dependências do projeto:

```sh
# Clone o repositório
git clone https://github.com/lunebakami/energy-invoice-reader.git

# Entre no diretório do projeto
cd energy-invoice-reader

## Backend
cd backend

# Instale as dependências
yarn setup

# Preencha o arquivo .env
cp .env.example .env

## Frontend
cd ../frontend

# Instale as dependências
yarn

# Preencha o arquivo .env
cp .env.example .env
```

## Uso

siga os passos para rodar o projeto:

```sh

# Entre no diretório do projeto
cd energy-invoice-reader

## Backend
cd backend

# Inicie o servidor
yarn start

# O servidor estará rodando em http://localhost:3000

## Frontend
cd ../frontend

# Inicie o client
yarn dev
# O client estará rodando em http://localhost:5173
```

## Testes
O Backend contém alguns testes, siga os passos para rodar os testes:

```sh
# Entre no diretório do projeto
cd energy-invoice-reader

## Entre no diretório do backend
cd backend

# Rode os testes
yarn test
```

## Contribuição
    - Fork o repositório
    - Crie uma branch para sua feature (git checkout -b feature/nome-da-feature)
    - Commit suas mudanças (git commit -am 'Adicionei uma nova feature')
    - Push para a branch (git push origin feature/nome-da-feature)
    - Crie um novo Pull Request

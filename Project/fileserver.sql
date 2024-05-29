-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Maio-2024 às 23:53
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `fileserver`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `performances`
--

CREATE TABLE `performances` (
  `idPerformance` int(11) NOT NULL,
  `correct_answers` int(11) NOT NULL,
  `wrong_answers` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `questioncategories`
--

CREATE TABLE `questioncategories` (
  `idquestionCategory` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `questioncategories`
--

INSERT INTO `questioncategories` (`idquestionCategory`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'tumor', '2024-05-27 17:58:02', '2024-05-27 17:58:02');

-- --------------------------------------------------------

--
-- Estrutura da tabela `questions`
--

CREATE TABLE `questions` (
  `idQuestion` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `answer1` varchar(255) NOT NULL,
  `answer2` varchar(255) NOT NULL,
  `answer3` varchar(255) DEFAULT NULL,
  `answer4` varchar(255) DEFAULT NULL,
  `correctAnswer` int(11) NOT NULL,
  `explanation` varchar(255) NOT NULL,
  `tip` varchar(255) NOT NULL,
  `type_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `questions`
--

INSERT INTO `questions` (`idQuestion`, `description`, `answer1`, `answer2`, `answer3`, `answer4`, `correctAnswer`, `explanation`, `tip`, `type_id`, `category_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Pergunta escolha multipla 1?', 'Esta reposta está errada - 1', 'Esta é a resposta correcta', 'Esta reposta está errada - 3', 'Esta reposta está errada - 4', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '2024-05-27 18:01:32', '2024-05-27 18:01:32'),
(2, 'Pergunta verdadeiro ou false 1?', '', '', '', '', 1, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '2024-05-27 18:01:32', '2024-05-27 18:01:32'),
(3, 'Pergunta ordenar 1?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 4321, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '2024-05-27 18:01:32', '2024-05-27 18:01:32'),
(4, 'Pergunta escolha multipla 2?', 'Esta reposta está errada - 1', 'Esta reposta está errada - 2', 'Esta é a resposta correcta', 'Esta reposta está errada - 4', 3, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '2024-05-27 18:01:32', '2024-05-27 18:01:32'),
(6, 'Pergunta verdadeiro ou false 2?', '', '', '', '', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '2024-05-27 18:01:32', '2024-05-27 18:01:32'),
(7, 'Pergunta ordenar 2?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 1234, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '2024-05-27 18:01:32', '2024-05-27 18:01:32'),
(8, 'Pergunta escolha multipla 3?', 'Esta reposta está errada - 1', 'Esta é a resposta correcta', 'Esta reposta está errada - 3', 'Esta reposta está errada - 4', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Pergunta verdadeiro ou false 3?', '', '', '', '', 1, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Pergunta ordenar 3?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 4321, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Pergunta escolha multipla 4?', 'Esta reposta está errada - 1', 'Esta reposta está errada - 2', 'Esta é a resposta correcta', 'Esta reposta está errada - 4', 3, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Pergunta verdadeiro ou false 4?', '', '', '', '', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'Pergunta ordenar 4?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 1234, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'Pergunta escolha multipla 5?', 'Esta reposta está errada - 1', 'Esta é a resposta correcta', 'Esta reposta está errada - 3', 'Esta reposta está errada - 4', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Pergunta verdadeiro ou false 5?', '', '', '', '', 1, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'Pergunta ordenar 5?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 4321, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Pergunta escolha multipla 6?', 'Esta reposta está errada - 1', 'Esta reposta está errada - 2', 'Esta é a resposta correcta', 'Esta reposta está errada - 4', 3, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Pergunta verdadeiro ou false 6?', '', '', '', '', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Pergunta ordenar 6?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 1234, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'Pergunta escolha multipla 7?', 'Esta reposta está errada - 1', 'Esta é a resposta correcta', 'Esta reposta está errada - 3', 'Esta reposta está errada - 4', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'Pergunta verdadeiro ou false 7?', '', '', '', '', 1, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'Pergunta ordenar 7?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 4321, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'Pergunta escolha multipla 8?', 'Esta reposta está errada - 1', 'Esta reposta está errada - 2', 'Esta é a resposta correcta', 'Esta reposta está errada - 4', 3, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 'Pergunta verdadeiro ou false 8?', '', '', '', '', 2, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'Pergunta ordenar 8?', 'Esta reposta é a número - 1', 'Esta reposta é a número - 2', 'Esta reposta é a número - 3', 'Esta reposta é a número - 4', 1234, 'Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. Explicação mega detalhada. ', 'Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. Uma dica fundamental. ', 4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `questiontypes`
--

CREATE TABLE `questiontypes` (
  `idquestionType` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `questiontypes`
--

INSERT INTO `questiontypes` (`idquestionType`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'multiplechoice', '2024-05-27 18:00:35', '2024-05-27 18:00:35'),
(2, 'truefalse', '2024-05-27 18:00:41', '2024-05-27 18:00:41'),
(3, 'drag', '2024-05-27 18:00:51', '2024-05-27 18:00:51'),
(4, 'order', '2024-05-27 18:01:22', '2024-05-27 18:01:22');

-- --------------------------------------------------------

--
-- Estrutura da tabela `userconditions`
--

CREATE TABLE `userconditions` (
  `idUserCondition` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `streak` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `points` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`idUser`, `email`, `password`, `first_name`, `last_name`, `age`, `streak`, `level`, `points`, `createdAt`, `updatedAt`) VALUES
(1, 'Filipe', '$2a$10$KrSWBKOPLXmNtukBzDED1.TJz82fLWZlKzEby8YUBCPIP4JThD5/a', 'Filipe', 'Cerqueira', 24, 23, 1, 8765, '2024-05-14 18:39:43', '2024-05-14 18:39:43');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `performances`
--
ALTER TABLE `performances`
  ADD PRIMARY KEY (`idPerformance`),
  ADD UNIQUE KEY `correct_answers` (`correct_answers`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices para tabela `questioncategories`
--
ALTER TABLE `questioncategories`
  ADD PRIMARY KEY (`idquestionCategory`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`idQuestion`),
  ADD UNIQUE KEY `description` (`description`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Índices para tabela `questiontypes`
--
ALTER TABLE `questiontypes`
  ADD PRIMARY KEY (`idquestionType`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `userconditions`
--
ALTER TABLE `userconditions`
  ADD PRIMARY KEY (`idUserCondition`),
  ADD UNIQUE KEY `description` (`description`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `performances`
--
ALTER TABLE `performances`
  MODIFY `idPerformance` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `questioncategories`
--
ALTER TABLE `questioncategories`
  MODIFY `idquestionCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `questions`
--
ALTER TABLE `questions`
  MODIFY `idQuestion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `questiontypes`
--
ALTER TABLE `questiontypes`
  MODIFY `idquestionType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `userconditions`
--
ALTER TABLE `userconditions`
  MODIFY `idUserCondition` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `performances`
--
ALTER TABLE `performances`
  ADD CONSTRAINT `performances_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `questioncategories` (`idquestionCategory`),
  ADD CONSTRAINT `performances_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`idUser`);

--
-- Limitadores para a tabela `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `questiontypes` (`idquestionType`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `questioncategories` (`idquestionCategory`);

--
-- Limitadores para a tabela `userconditions`
--
ALTER TABLE `userconditions`
  ADD CONSTRAINT `userconditions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

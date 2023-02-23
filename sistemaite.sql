-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2023 a las 23:14:30
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemaite`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `persona_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `persona_id`, `created_at`, `updated_at`) VALUES
(1, 2, '2022-08-26 19:50:41', '2022-08-26 19:50:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidop` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidom` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechanacimiento` date DEFAULT NULL,
  `direccion` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT 'N/S',
  `carnet` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expedido` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT 'N/S',
  `foto` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `como` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `papelinicial` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `votos` tinyint(3) UNSIGNED DEFAULT 1,
  `volvera` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `vuelvefecha` date DEFAULT NULL,
  `empresa` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `habilitado` tinyint(1) DEFAULT 0,
  `persona_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pais_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ciudad_id` bigint(20) UNSIGNED DEFAULT NULL,
  `zona_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `nombre`, `apellidop`, `apellidom`, `fechanacimiento`, `direccion`, `carnet`, `expedido`, `genero`, `foto`, `como`, `papelinicial`, `telefono`, `votos`, `volvera`, `vuelvefecha`, `empresa`, `habilitado`, `persona_id`, `pais_id`, `ciudad_id`, `zona_id`, `created_at`, `updated_at`) VALUES
(1, 'DAVID EDUARDO', 'FLORES', 'BELTRAN', '2015-05-15', 'Barrio Melgar', '456135', 'BEN', 'HOMBRE', 'estudiantes/foto.jpg', 'FACEBOOK', 'docente', '0', 1, 0, NULL, NULL, 1, NULL, 1, 6, 1, '2022-08-26 19:50:41', '2022-08-26 19:50:41'),
(2, 'LIDIA', 'CONTRERAS', 'CATARI', '2015-05-15', 'Barrio Luis Soruco Barba', '45615535', 'BEN', 'HOMBRE', 'estudiantes/cyVSKzLN7HZW8VdI3hGG.jpg', 'FACEBOOK', 'estudiante', '71039910', 1, 0, NULL, NULL, 1, NULL, 1, 6, 1, '2022-08-26 19:50:41', '2022-08-26 20:19:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_persona_estudiante` (`persona_id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_persona_persona1_idx` (`persona_id`),
  ADD KEY `fk_persona_pais_idx` (`pais_id`),
  ADD KEY `fk_persona_ciudad_idx` (`ciudad_id`),
  ADD KEY `fk_persona_zona_idx` (`zona_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `fk_persona_estudiante` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `fk_persona_ciudad_idx` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`),
  ADD CONSTRAINT `fk_persona_pais_idx` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`),
  ADD CONSTRAINT `fk_persona_persona1_idx` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `fk_persona_zona_idx` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# DSL-ArduinoML

Cette librairie TypeScript est un DSL interne ayant pour objectif de vous permettre de générer du code 
arduino de manière simple et (on l'espère) intuitive. 

## Où voir les implémentations de test

Afin de visualiser les fichiers arduino de tests (qui vous aideront à comprendre le code), nous vous
invitons à accéder au fichier `library/grammar/application.test.ts`, vous y trouverez les démos.

Pour lancé les différents tests de ce fichier, vous pouvez lancer la commande
```shell
cd library
mocha --reporter spec --compilers ts:ts-node/register src/grammar/main/application.test.ts
```

Nous avons également réalisé les montages electronique sur le site wokwi, vous pourrez trouver les archives
dans `ressources/worki`.

## Futur de l'application

Ce projet est un projet d'école réalisé dans le cadre du cours "DSL : Domain Specific Language", il 
a pour vocation a tester la puissance de TypeScript pour réaliser un DSL interne. Nous en avons conclu que
ce language n'étais pas des plus adapté pour ce genre de problèmes, cependant, nous allons, par la suite
dans le fichier frontend, créer une application qui peremttra, dans un navigateur, de créer de générer
des fichiers .ino de manière intuitive, via un DSL externe réalisé sous forme d'une interface graphique.





## Auteurs
* Brault Yann
* D'Andrea William

Cette implémentation est très largement influencé par la version de pascalpoizat 
dispnible ici https://github.com/mosser/ArduinoML-kernel/tree/master/embeddeds/python

### Documentation pour la création de la library

* https://www.tsmean.com/articles/how-to-write-a-typescript-library/unit-testing/
* https://www.tsmean.com/articles/how-to-write-a-typescript-library/local-consumer/
* https://www.tsmean.com/articles/how-to-write-a-typescript-library/

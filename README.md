# L3M - CL&IHM TP : CC 1, la TodoList

_____________
**PATCH** : Le fait de nommer "change" les output des composants n'est pas une bonne idée, cela interfère avec certains comportements par défaut du navigateur.<br/>==> renommez les output (ex: "update").
_____________

Dans ce CC, vous allez coder une todolist en Angular.
Vous pouvez trouver un exemple de ce qui est attendu sur ce site en ligne : [https://l3-miage-grenoble.github.io/l3m-clihm-2025-2026-cc-1/](https://l3-miage-grenoble.github.io/l3m-clihm-2025-2026-cc-1/)

Notez que :
* Vous pouvez ajouter un item en saisissant un texte et en appuyant sur Entrée.
* Vous pouvez spécifier la couleur de l'item à créer avec le sélecteur de couleur à gauche du champ de saisie.
* Vous avez une checkbox dans le header qui indique si tous les items sont complétés ou non. En cliquant dessus, vous pouvez marquer tous les items comme complétés ou non complétés.
* Pour chaque item de la liste :
  * vous avez accès à un bouton pour le supprimer quand vous le survolez avec la souris.
  * Si vous double-cliquez sur son label, vous pouvez éditer son label ainsi que sa couleur.
  * Que ce soit en mode édition ou non, vous pouvez cliquer sur la checkbox pour marquer l'item comme complété ou non complété.
* Dans le footer, vous avez un système de spécification de filtre
  * Les items affichés sont ceux correspondant au filtre
  * Un menu déroulant permet de choisir entre afficher tous les items, seulement ceux qui sont complétés ou seulement ceux qui ne le sont pas.
  * Un champ de texte permet de filtrer les items dont le label contient les mots saisis (insensible à la casse). Les mots sont séparés par des espaces.

Vous devez respecter les contraintes suivantes :
* TodoList est un composant pur.
* TodoItem est un composant pur.
* ItemFilter est un composant pur.

Pour ce CC, nous vous proposons l'ordre de réalisation suivant, notez que vous pouvez adapter cet ordre à votre convenance.

## Partie A : Composant TodoList et racine (5 points)

Fichiers à modifier :
  * `src/app/components/l3m-todo-list/l3m-todo-list.ts` : Vue-modèle du composant TodoList
  * `src/app/components/l3m-todo-list/l3m-todo-list.html` : Vue du composant TodoList
  * `src/app/app.ts` : Vue-modèle du composant racine
  * `src/app/app.html` : Vue du composant racine

L'objectif de cette partie est de pouvoir créer des items via le champs de saisie de la todolist, on affichera également la liste des items créés à l'aide de composants TodoItem, sans les avoir encore complètement implémentés.

Indications pour le composant Racine (attention à bien respecter les bonnes pratiques)
  * Dans la vue, modifiez les balises `<l3m-todo-list>` pour vous abonner aux évènements `change` que le composant TodoList pourra émettre. Traitez ces évènements avec la méthode `updateList` définie dans la vue-modèle du composant racine.
  * Dans la vue-modèle :
    * Modifiez l'affectation de l'attribut `todoList` pour qu'il utilise le service `L3mTotoListService` afin de récupérer les données de la todolist.
    * Implémentez la méthode `updateList` qui met à jour les données de la todolist via le service `L3mTotoListService`.

Indications pour le composant TodoList (attention à bien respecter les bonnes pratiques) :
  * Créez un signal `currentColor` initialisé à `#ffffff` pour stocker la couleur sélectionnée dans le sélecteur de couleur.
  * Créez un signal `newLabel` initialisé à une chaîne vide pour stocker le label saisi dans le champ de texte.
  * Bien que le composant TodoItem ne soit pas encore implémenté, modifiez la vue du composant TodoList pour afficher la liste des items.
  * Créez une méthode `onSubmitNewItem(): void` qui sera appelée lors de la soumission du formulaire d'ajout d'un item. Cette méthode doit émettre un objet de type `L3mTodoListOutput` via la sortie `change` du composant TodoList. Cette méthode doit être appelée lors de la survenu de l'évènement `submit` de la balise `<form>` dans la vue du composant TodoList. Le type `L3mTodoListOutput` est défini à la ligne 11 du fichier `src/app/components/l3m-todo-list/l3m-todo-list.component.ts`.

## Partie B : Composant TodoItem, mode non-édition (5 points)

Fichiers à modifier :
  * `src/app/components/l3m-todo-item/l3m-todo-item.ts` : Vue-modèle du composant TodoItem
  * `src/app/components/l3m-todo-item/l3m-todo-item.html` : Vue du composant TodoItem
  * `src/app/components/l3m-todo-list/l3m-todo-list.ts` : Vue-modèle du composant TodoList
  * `src/app/components/l3m-todo-list/l3m-todo-list.html` : Vue du composant TodoList

On va maintenant implémenter le composant TodoItem pour afficher les items de la todolist (en mode non-édition). On vérifiera que tout est bien implémenté grâce au double rendu de la liste, une modification d'un item dans une des liste devrait se répercuter sur l'autre. On devra pouvoir cocher/décocher l'item ou de le supprimer (à l'aide de la croix rouge qui apparait à droite de l'item au survol de la souris).

Indications pour le composant TodoItem (attention à bien respecter les bonnes pratiques) :
  * Modifiez la vue du composant TodoItem pour afficher les données de l'item (label et statut complété, la couleur est déjà bindé) en mode non-édition (partie `@else` de la vue). Pour la checkbox, vous pourrez vous appuyer sur l'attribut `ngModel`.
  * Abonnez-vous à la checkbox pour détecter les changements de son état (évènement `ngModelChange`) et implémentez la méthode `updateCompleted(): void` dans la vue-modèle du composant TodoItem pour gérer cet évènement.
  * Toujours en mode non-édition, implémentez la suppression de l'item lorsque l'utilisateur clique sur la croix rouge (évènement `click`). Passez par une méthode `deleteItem(): void`.
  * Que ce soit pour la checkbox ou la croix, pensez bien à émettre un évènement via la sortie change du composant. Le type de données émises par `change` est `L3mTodoItemOutput`, défini à la ligne 9 du fichier `src/app/components/l3m-todo-item/l3m-todo-item.ts`.

Indications pour le composant TodoList :
  * Modifiez la vue et la vue modèle du composant TodoList pour gérer les évènements `change` émis par les composants TodoItem.
  * Vous pourrez définir et vous appuyer sur la méthode `propagateItemChange(item: TodoItem, event: L3mTodoItemOutput): void`.

## Partie C : Composant TodoItem, mode édition (5 points)

Fichiers à modifier :
  * `src/app/components/l3m-todo-item/l3m-todo-item.ts` : Vue-modèle du composant TodoItem
  * `src/app/components/l3m-todo-item/l3m-todo-item.html` : Vue du composant TodoItem
  * `src/app/components/l3m-todo-list/l3m-todo-list.ts` : Vue-modèle du composant TodoList
  * `src/app/components/l3m-todo-list/l3m-todo-list.html` : Vue du composant TodoList

On veut maintenant pouvoir éditer les items de la todolist. Pour passer en mode édition, on utilisera le double-click sur l'item. On s'assurera également qu'un seul item peut être édité à la fois. La vue de l'item en mode édition est déjà partiellement implémentée, vous devez la finaliser. Vous devrez également modifier le composant TodoList pour gérer le mode édition.

Instructions pour le composant TodoList (respectez les bonnes pratiques) :
  * Dans la vue-modèle, ajoutez un signal `editedItem` qui vous servira à connaitre l'item actuellement édité, si il y en a un. Notez qu'il y a au plus un item édité à la fois **par composant todo-list**.
  * Dans la vue, utilisez l'entrée `edit` des balises `<l3m-todo-item>` pour indiquer au composant TodoItem si il doit être en mode édition ou non. Utilisez les évènements `dblclick` des balises `<l3m-todo-item>` pour gérer le passage en mode édition.
  * Dans la vue, utilisez la sortie `cancelEdition` des balises `<l3m-todo-item>` pour gérer l'annulation du mode édition (il n'y a alors plus d'item édité).

Instructions pour le composant TodoItem (respectez les bonnes pratiques) :
  * Dans la vue-modèle, ajoutez les signaux suivants pour stocker les données éditées :
    * `editedLabel`, qui produit des `string`, initialisé à une chaîne vide.
    * `editedColor`, qui produit des `string`, initialisé à `#000000`.
    * `editedCompleted`, qui produit des `boolean`, initialisé à `false`.
  * Dans la vue, établissez les data-bindings avec les signaux créés précédemment pour le mode édition (partie `@if` de la vue).
  * Dans la vue et la vue-modèle, ajoutez ce qu'il faut pour gérer la validation ou l'annulation des modifications en mode édition.
  * Dans la vue-modèle, complétez le constructeur pour initialiser les valeurs des signaux `editedLabel`, `editedColor` et `editedCompleted` avec les données passées en entrée (attribut `data`) lorsque l'item passe en mode édition, appuyez-vous sur un effet pour cela. Créez un effet qui réagit aux changements du signal `edit`. Cet effet doit :
    * S'exécuter automatiquement quand `edit` change de valeur
    * Vérifier si `edit()` vaut true
    * Si c'est le cas, initialiser les trois signaux `editedLabel`, `editedColor` et `editedCompleted` avec les valeurs correspondantes du signal data().

## Partie D : Intégration du composant ItemFilter (5 points)

Fichiers à modifier :
  * `src/app/components/l3m-todo-list/l3m-todo-list.ts` : Vue-modèle du composant TodoList
  * `src/app/components/l3m-todo-list/l3m-todo-list.html` : Vue du composant TodoList

Le composant ItemFilter est déjà complètement implémenté, vous devez l'intégrer dans le composant TodoList. Le composant TodoList devra afficher uniquement les items correspondant aux critères de filtrage spécifiés dans le composant ItemFilter.

Indications pour le composant TodoList (respectez les bonnes pratiques) :
  * Intégrer le composant ItemFilter dans la vue du composant TodoList (dans la footer). Appuyez-vous sur la sortie `change` du composant ItemFilter pour détecter les changements de critères de filtrage.<br/>**Indication** : le type des données émises par la sortie `change` du composant ItemFilter est `L3mItemFilterOutput`, défini au début du fichier `src/app/components/l3m-item-filter/l3m-item-filter.ts`, nous le rappelons ici pour vous aider :
    ```typescript
    type L3mItemFilterOutput = (item: TodoItem) => boolean;
    ```
  * Modifiez la vue-modèle et la vue du composant TodoList pour gérer la liste des items filtrés en fonction des critères spécifiés dans le composant ItemFilter.
  * Utilisez cette liste filtrée pour afficher les items dans la vue du composant TodoList.

## Partie E : Finalisation (3 points)

Enfin, on vous demande de finaliser l'application en ajoutant les fonctionnalités suivantes :
* Le footer ne doit s'afficher QUE SI la liste des items n'est pas vide (on parle ici des items avant filtrage). Appuyez-vous sur un signal dérivé pour cela.
* Afficher dans le footer le nombre d'items non complétés.
* Gérer dans le header la checkbox :
  * Elle est cochée si et seulement si la liste des items avant filtrage est non vide ET que tous les items sont complétés.
  * Quand l'utilisateur la coche la checkbox, alors ça coche tous les items (tous les items deviennent complétés). **Optimisation** : ne mettez à jour que les items dont l'état `completed` va réellement changer
  * Quand l'utilisateur décoche la checkbox, alors ça décoche tous les items (tous les items deviennent non complétés).

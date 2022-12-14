/*
-- УСЛОВИЕ ЗАДАЧИ --
Дано бинарное дерево поиска, в котором хранятся ключи. Ключи — уникальные целые числа. Найдите вершину с заданным ключом и удалите её из дерева так, 
чтобы дерево осталось корректным бинарным деревом поиска. Если ключа в дереве нет, то изменять дерево не надо.
На вход вашей функции подаётся корень дерева и ключ, который надо удалить. Функция должна вернуть корень изменённого дерева. Сложность удаления узла 
должна составлять O(h), где h –— высота дерева.
Создавать новые вершины (вдруг очень захочется) нельзя.

Формат ввода
Ключи дерева – натуральные числа, не превышающие 10^9. В итоговом решении не надо определять свою структуру/свой класс, описывающий вершину дерева.
Используйте заготовки кода для данной задачи, расположенные по ссылкам:

Формат вывода
По умолчанию выбран компилятор Make. Решение нужно отправлять в виде файла с расширением, которое соответствует вашему языку программирования. 
Если вы пишете на Java, имя файла должно быть Solution.java, для C# – Solution.cs. Для остальных языков назовите файл my_solution.ext, заменив 
ext на необходимое расширение.


-- ПРИНЦИП РАБОТЫ --
Пробегаемя по всему деоеву в поисках удаляемого узла. Находим его.
Далее разбираем три граничных случая:
 - если потомков нет, то просто удаляем без доп.манипуляций.
 - если есть только левый или только правый потомок, то в ссылку удаляемого узла записываем ссылку на соответствующее поддерево.

Если есть два потомка, то ищем самый левый элемент в правом поддереве. Затем обмениваем value найденного newNode и удаляемого элемента
и запускаем процедуру удаления newNode для ребалансировки, если у него есть потомок справа(слева потомка быть не может, так как мы выбрали самый левый элемент)



-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    O(h), где h - высота дерева.
-- АСИМПТОТИЧЕСКАЯ СЛОЖНОСТЬ --
    Ассимптотическая сложность O(n), где n - количество хранимых в памяти узлов.
-- Посылка --
    https://contest.yandex.ru/contest/24810/run-report/80182664/
*/

function minNode(node) {
    if (node.left === null) {
        return node;
    } else {
        return minNode(node.left);
    }    
}

function remove(node, key) {
    if (node === null) {
        return null;

    // ищем рекурсивно удаляемый узел-----------------------------------------
    } else if (key < node.value) {
        node.left = remove(node.left, key);
        return node;

    } else if (key > node.value) {
        node.right = remove(node.right, key);
        return node;
    //-----------------------------------------------------------------------

    } else {
        // если у удаляемого узла нет потомков - лист, то стираем ссылку на него
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }
        // если есть один потомок потомок, то на место ссылки на удаляемый элемент записываем ссылку на потомка
        if (node.left === null) {
            node = node.right;
            return node;
        } else if(node.right === null) {
            node = node.left;
            return node;
        }
        // если есть два потомка, то ищем в правом поддереве самый левый элемент и заменяем значение value у удаляемого узла на найденный
        // затем проводим операцию удаления для правого поддерева, но в качестве удаляемого элемента выбираем уже тот, который использовали newNode
        let newNode = minNode(node.right);
        node.value = newNode.value;
        node.right = remove(node.right, newNode.value);
        return node;
    }
}
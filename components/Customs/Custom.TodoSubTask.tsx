import React, { useState } from "react";
import TodoSubTaskCard from "./TodoSubTask.Card";

type SubTaskPropsType = {
  id: string | undefined;
};

export type SubTaskType = {
  id?: string;
  parentId: string | null;
  name: string;
  isDone: boolean;
  isDeleted: boolean;
  taskId: string;
};

type TreePropsType = {
  data: SubTaskType[];
};

type TreeNodeType = {
  node: NodeType | null;
  depth: number;
  maxDepth: number;
  onLoadMore: () => void;
};

type NodeType = {
  parentId: string | null;
  children: NodeType[];
  id: string;
  name: string;
  isDone: boolean;
  isDeleted: boolean;
  taskId: string;
};

const buildTree = (data: SubTaskType[]) => {
  const map = new Map();
  let root = null;

  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  data.forEach((item) => {
    const node = map.get(item.id);
    if (item.parentId === null) {
      root = node;
    } else {
      const parentNode = map.get(item.parentId);
      if (parentNode && item.isDeleted === false) {
        parentNode.children.push(node);
      }
    }
  });

  return root;
};

const TreeNode = ({ node, depth, maxDepth, onLoadMore }: TreeNodeType) => {
  if (!node) return null;

  const showChildren =
    depth < maxDepth || (depth === maxDepth && node.children.length > 0);
  const childrenHtml = showChildren ? (
    <ul className="pl-4 list-none">
      {node.children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          maxDepth={maxDepth}
          onLoadMore={onLoadMore}
        />
      ))}
      {depth === maxDepth && node.children.length > 0 && (
        <li style={{ marginLeft: depth * 3 }}>
          <button className="text-blue-400 underline" onClick={onLoadMore}>
            Load More
          </button>
        </li>
      )}
    </ul>
  ) : null;

  return (
    <li
      className={`ps-2 py-1 ${
        depth > 0 ? "border-l-2 border-black dark:border-white" : ""
      }`}
      style={{ marginLeft: depth * 3 }}
    >
      <TodoSubTaskCard
        props={node}
        depth={depth}
        childrenLength={node.children.length}
      />

      {childrenHtml}
    </li>
  );
};

const Tree = (props: TreePropsType) => {
  const [maxDepth, setMaxDepth] = useState(3);
  const tree = buildTree(props.data);

  const handleLoadMore = () => {
    setMaxDepth(Infinity);
  };

  return (
    <ul className="list-none p-0 m-0">
      <TreeNode
        node={tree}
        depth={0}
        maxDepth={maxDepth}
        onLoadMore={handleLoadMore}
      />
    </ul>
  );
};

const CustomTodoSubTask = (task: SubTaskPropsType) => {
  const [data, setTempData] = useState<SubTaskType[]>([
    {
      id: "1",
      parentId: null,
      name: "Root",
      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "2",
      parentId: "1",
      name: "Child 1",
      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "3",
      parentId: "1",
      name: "Child 2",

      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "4",
      parentId: "2",
      name: "Grandchild 1",

      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "5",
      parentId: "2",
      name: "Grandchild 2",

      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "6",
      parentId: "3",
      name: "Grandchild 3",

      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "7",
      parentId: "4",
      name: "Great-Grandchild 1",

      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "8",
      parentId: "4",
      name: "Great-Grandchild 2",

      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
    {
      id: "9",
      parentId: "5",
      name: "Great-Grandchild 3",

      isDone: false,
      isDeleted: true,
      taskId: "11",
    },
    {
      id: "10",
      parentId: "6",
      name: "Great-Grandchild 4",

      isDone: false,
      isDeleted: false,
      taskId: "11",
    },
  ]);

  if (!task.id) {
    return "failed to get subtask";
  }

  return (
    <section className="p-4">
      <Tree data={data} />
    </section>
  );
};

export default CustomTodoSubTask;

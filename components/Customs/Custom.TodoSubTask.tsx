import React, { useState } from "react";

type SubTaskPropsType = {
  id: string | undefined;
};

type SubTaskType = {
  id: string;
  parentId: string | null;
  name: string;
};
// isDone: boolean;
// isDeleted: boolean;
// taskId: string;

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
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });

  console.log("root: ", root);

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
        <li>
          <button className="text-blue-500 underline" onClick={onLoadMore}>
            Load More
          </button>
        </li>
      )}
    </ul>
  ) : null;

  return (
    <li
      className={`py-1 ${depth > 0 ? "border-l border-gray-300" : ""}`}
      style={{ marginLeft: depth * 20 }}
    >
      {node.name}
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
    { id: "1", parentId: null, name: "Root" },
    { id: "2", parentId: "1", name: "Child 1" },
    { id: "3", parentId: "1", name: "Child 2" },
    { id: "4", parentId: "2", name: "Grandchild 1" },
    { id: "5", parentId: "2", name: "Grandchild 2" },
    { id: "6", parentId: "3", name: "Grandchild 3" },
    { id: "7", parentId: "4", name: "Great-Grandchild 1" },
    { id: "8", parentId: "4", name: "Great-Grandchild 2" },
    { id: "9", parentId: "5", name: "Great-Grandchild 3" },
    { id: "10", parentId: "6", name: "Great-Grandchild 4" },
  ]);

  if (!task.id) {
    return "failed to get subtask";
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nested List with Load More</h1>
      <Tree data={data} />
    </div>
  );
};

export default CustomTodoSubTask;

interface SelectionItem {
  id: number;
  label: string;
  icon: JSX.Element;
}
const NotificationDrawer = ({
  listItems,
  selected,
  setSelected,
  theme
}: {
  setSelected: (i: SelectionItem) => void;
  selected: SelectionItem;
  listItems: SelectionItem[];
  theme: string;
}) => {
  return (
    <div
      className={`notification__drawer-container ${theme === "dark"
        ? "notification__drawer-container--dark"
        : "notification__drawer-container--light"}`}
    >
      {listItems.map(listItem => {
        return (
          <div
            key={listItem.id}
            id={listItem.id.toString()}
            className={`notification__drawer-item ${selected.id === listItem.id
              ? "notification__drawer-item--selected"
              : null}`}
            onClick={() => setSelected(listItem)}
          >
            <span className="notification__drawer-container__icon">
              {listItem.icon}
            </span>
            <span className="notification__drawer-container__label">
              {listItem.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default NotificationDrawer;

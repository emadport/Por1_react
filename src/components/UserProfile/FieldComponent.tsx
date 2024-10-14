import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { ReactElement } from "react"
import { MdEdit } from "react-icons/md"
import { themeColor } from "utils/theme"

const FieldComponent = ({
  label,
  value,
  icon,
  onEdit,
  name,
  editable
}: {
  label: string | ReactElement
  value: string
  icon: JSX.Element
  onEdit: (key: string, value: string) => void
  name: string,
  editable: boolean
}) => {
  return (
    <ListItem style={{ position: 'relative', width: 'fit-content' }}>
      <ListItemAvatar>
        <Avatar sx={{ border: `2px solid ${themeColor}` }}>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={label} secondary={value} />
      <ListItemAvatar>
        <Avatar
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'transparent',

            transform: 'translate(0,50%)',
            padding: 0,
          }}
        >
          <MdEdit
            color="tomato"
            className="icon"
            aria-disabled={editable}
            style={{
              backgroundColor: 'transparent',
              border: `2px solid ${'gray'}`,
              borderRadius: '50%',
              padding: '5px',

            }}
            onClick={() => {if(editable)onEdit(name as string, value)}}
            size={12}
          />
        </Avatar>
      </ListItemAvatar>
    </ListItem>
  )
}
export default FieldComponent
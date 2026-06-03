import { Header, Dropdown, Avatar } from "hove-cadence-ui";

const CLIENT_OPTIONS = [
  { id: "idfm", label: "Île-de-France Mobilités" },
  { id: "bordeaux", label: "Bordeaux Métropole" },
  { id: "lyon", label: "Métropole de Lyon" },
  { id: "nantes", label: "Nantes Métropole" },
];

interface Props {
  clientId?: string;
  onClientChange?: (id: string) => void;
}

export default function AppHeader({ clientId = "idfm", onClientChange }: Props) {
  return (
    <Header
      leftContent={
        <div style={{ minWidth: 220 }}>
          <Dropdown
            options={CLIENT_OPTIONS}
            value={clientId}
            onChange={onClientChange}
          />
        </div>
      }
      rightContent={
        <Avatar
          name="Hector Malot"
          email="hector.malot@hove.com"
          showIcon
          showProfile
          size="sm"
          color="gray"
        />
      }
    />
  );
}

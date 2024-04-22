import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Card } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import "./App.css";

function App() {
  return (
<>
<Card>

<Card
direction="row"
px={4}
gap={2}
bg={"gray.600"}
>

<Menu>
          <MenuButton
            px={4}
            py={2}
            transition='all 0.2s'
            borderRadius='md'
            borderWidth='1px'
            bg={"gray.200"}
            _hover={{ bg: 'green.100' }}
            _expanded={{ bg: 'green.200' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Archivo <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>Crear Archivos</MenuItem>
            <MenuDivider />
            <MenuItem>Abrir Archivos</MenuItem>
            <MenuDivider />
            <MenuItem>Guardar Archivo</MenuItem>
            <MenuDivider />
          </MenuList>
          </Menu>

          <Menu>
          <MenuButton
            px={4}
            py={2}
            transition='all 0.2s'
            borderRadius='md'
            borderWidth='1px'
            bg={"gray.200"}
            _hover={{ bg: 'green.100' }}
            _expanded={{ bg: 'green.200' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Herramienta <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>Ejecutar</MenuItem>
            <MenuDivider />
          
          </MenuList>


        </Menu>



        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition='all 0.2s'
            borderRadius='md'
            borderWidth='1px'
            bg={"gray.200"}
            _hover={{ bg: 'green.100' }}
            _expanded={{ bg: 'green.200' }}
            _focus={{ boxShadow: 'outline' }}
          >
            Reporte <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>Reporte de Errores </MenuItem>
            <MenuDivider />
            <MenuItem>Generar Arbol AST </MenuItem>
            <MenuDivider />
          
          </MenuList>


        </Menu>





</Card>

</Card>
</>
  );
}

export default App

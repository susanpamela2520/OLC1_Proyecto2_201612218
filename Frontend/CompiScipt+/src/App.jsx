import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Card } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Flex, Spacer } from '@chakra-ui/react'


import "./App.css";


function App() {

  let [consola, setConsola] = useState("")
  let [editor, setEditor] = useState("")

  let handleConsolaChange = (e) => {
    setConsola(e.target.value)
  }

  let handleEditorChange = (e) => {
    setEditor(e.target.value)
  }

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


<Flex gap={2} p={5}>
        <Editor
          height="90vh"
          value={editor}
          onChange={handleEditorChange}
        ></Editor>
        <Textarea
          isReadOnly
          size='sm'
          value={consola}
          onChange={handleConsolaChange}
          placeholder="Consola..."
          rows={50}
        />
      </Flex>

</Card>
</>
  );
}

export default App

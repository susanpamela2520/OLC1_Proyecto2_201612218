%{
    import { LexicalErrorEx } from './Exceptions/LexicalErrorEx';
    import { Cout } from './Statements/Cout';
    import { Terminal } from "./Expressions/Terminal";
    import { IStatement } from "./Abstract/IStatement";
    import { Terminals } from "./Enums/EnumTerminals";
    import { Execute } from "./Statements/Execute";
    import { Method } from "./Statements/Method";
    import { Terminals } from "./Enums/EnumTerminals";
    import { Terminal } from "./Expressions/Terminal";
%}

%lex
%options case-insensitive

%%
\s+ // ignore whitespaces
"//".* // ignore comments
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // ignore comments

// terminals
[0-9]+("."[0-9]+)\b return 'DECIMAL';
[0-9]+\b return 'INTEGER';
True|False return 'LOGICAL';
\"((\\\")|[\\n]|[\\\\]|[^\"])*\" {yytext=yytext.substr(1,yyleng-2); return 'STRING';}
\'((\\\')|[\\n]|[\\\\]|[^\'])?\' {yytext=yytext.substr(1,yyleng-2); return 'CHAR';}



'<<' return 'IMP';
';'  return 'END_SENT';
'('   return 'OP_PARENT';
')'  return 'CL_PARENT';
'{' return 'OP_BRACE';
'}'  return 'CL_BRACE';
'cout' return 'COUT';
'execute' return 'EXECUTE';
'void'    return 'VOID';

[0-9a-zA-Z_]+ return 'IDENTIFIER';

<<EOF>> return 'EOF'; // end of file
. { }



/lex

%start ini

%%

ini: main_statements EOF { return $1; };

// main statements
main_statements: main_statements main_statement { $1.push($2); $$ = $1; }
    | main_statement { $$ = new Array<IStatement>(); $$[0] = $1; };

// main statement
main_statement: run_st END_SENT { $$ = $1; }
    | function { $$ = $1; }
    | method { $$ = $1; };

// standard statements
standard_statements: standard_statements standard_statement { $1.push($2); $$ = $1; }
    | standard_statement { $$ = new Array<IStatement>(); $$[0] = $1; };


// standard statement
standard_statement:  print_st END_SENT { $$ = $1; };


run_st: EXECUTE IDENTIFIER OP_PARENT CL_PARENT { $$ = new Execute($2, undefined, @1.first_line, @1.first_column); };


print_st: COUT IMP expr IMP { $$ = new Cout($3, @1.first_line, @1.first_column); };




// method
method: VOID IDENTIFIER OP_PARENT CL_PARENT  OP_BRACE standard_statements CL_BRACE { $$ = new Method($2, undefined, $6, @1.first_line, @1.first_column); };
    






expr: value { $$ = $1; };

value : DECIMAL { $$ = new Terminal(Terminals.DECIMAL, Number($1), @1.first_line, @1.first_column); }
    | INTEGER { $$ = new Terminal(Terminals.INTEGER, Number($1), @1.first_line, @1.first_column); }
    | STRING { $$ = new Terminal(Terminals.STRING, $1, @1.first_line, @1.first_column); }
    | CHAR { $$ = new Terminal(Terminals.CHAR, $1, @1.first_line, @1.first_column); };






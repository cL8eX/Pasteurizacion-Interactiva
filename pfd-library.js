const pfdSymbols=[
{id:'pump',name:'Bomba centrífuga',cat:'Equipos',desc:'Bomba centrífuga para impulsar una corriente líquida.',svg:'<path d="M12 42 H28"/><circle cx="43" cy="30" r="18"/><path d="M34 39 Q49 34 48 20 Q36 20 34 39Z" fill="none"/><path d="M43 12 V5 H62 V12"/><path d="M61 42 H74"/>'},
{id:'pump-positive',name:'Bomba de desplazamiento',cat:'Equipos',desc:'Bomba de desplazamiento positivo.',svg:'<path d="M10 30 H24"/><rect x="24" y="15" width="36" height="30" rx="3"/><circle cx="42" cy="30" r="10"/><path d="M60 30 H74"/>'},
{id:'tank',name:'Tanque atmosférico',cat:'Equipos',desc:'Tanque vertical de almacenamiento atmosférico.',svg:'<path d="M20 12 Q42 2 64 12 V50 Q42 60 20 50 Z"/><path d="M20 12 Q42 22 64 12"/><path d="M42 2 V12 M42 50 V58"/>'},
{id:'tank-horizontal',name:'Tanque horizontal',cat:'Equipos',desc:'Tanque cilíndrico horizontal.',svg:'<rect x="12" y="14" width="60" height="32" rx="16"/><path d="M28 14 V46 M56 14 V46 M42 46 V55"/>'},
{id:'heat-shell',name:'Intercambiador carcasa y tubos',cat:'Equipos',desc:'Intercambiador de calor tipo carcasa y tubos.',svg:'<rect x="15" y="10" width="54" height="40"/><path d="M20 16 L64 44 M20 44 L64 16 M20 30 H64"/><path d="M8 30 H15 M69 30 H76"/>'},
{id:'heat-plate',name:'Intercambiador de placas',cat:'Equipos',desc:'Intercambiador compacto de placas.',svg:'<rect x="20" y="8" width="44" height="48"/><path d="M27 12 L57 52 M32 12 L62 52 M22 16 L52 56 M22 48 L58 12 M22 40 L58 8 M22 32 L58 16"/><path d="M8 20 H20 M64 44 H76"/>'},
{id:'heater',name:'Calentador',cat:'Equipos',desc:'Equipo de calentamiento de proceso.',svg:'<rect x="20" y="8" width="44" height="48"/><path d="M28 16 L56 16 L28 28 L56 28 L28 40 L56 40 L28 52"/><path d="M8 32 H20 M64 32 H76"/>'},
{id:'cooler',name:'Enfriador',cat:'Equipos',desc:'Equipo para enfriamiento de una corriente.',svg:'<rect x="20" y="8" width="44" height="48"/><path d="M28 16 L56 16 L28 28 L56 28 L28 40 L56 40 L28 52"/><path d="M8 32 H20 M64 32 H76"/>'},
{id:'filter',name:'Filtro',cat:'Equipos',desc:'Filtro de proceso para separación de sólidos.',svg:'<rect x="18" y="12" width="48" height="36"/><path d="M24 18 L60 42 M24 42 L60 18 M24 30 H60"/><path d="M8 30 H18 M66 30 H76"/>'},
{id:'separator',name:'Separador',cat:'Equipos',desc:'Recipiente de separación de fases.',svg:'<path d="M25 10 H59 V50 Q42 60 25 50 Z"/><path d="M25 25 H59 M42 2 V10 M42 50 V58"/>'},
{id:'mixer',name:'Mezclador',cat:'Equipos',desc:'Tanque con agitador mecánico.',svg:'<rect x="20" y="12" width="44" height="40"/><path d="M42 2 V34 M30 34 H54 M34 28 L50 40 M50 28 L34 40"/><path d="M8 32 H20 M64 32 H76"/>'},
{id:'homogenizer',name:'Homogeneizador',cat:'Equipos',desc:'Equipo para homogeneización de producto.',svg:'<rect x="20" y="18" width="44" height="28"/><circle cx="31" cy="32" r="9"/><circle cx="53" cy="32" r="9"/><path d="M8 32 H20 M64 32 H76"/>'},
{id:'pasteurizer',name:'Pasteurizador HTST',cat:'Equipos',desc:'Equipo de pasteurización de alta temperatura y corto tiempo.',svg:'<rect x="20" y="8" width="44" height="48"/><path d="M26 14 H58 V22 H26 V30 H58 V38 H26 V46 H58"/><path d="M8 32 H20 M64 32 H76"/>'},
{id:'evaporator',name:'Evaporador',cat:'Equipos',desc:'Equipo para evaporación de una corriente.',svg:'<path d="M22 10 H62 V48 Q42 58 22 48 Z"/><path d="M28 18 Q42 28 56 18 Q42 38 28 28 Q42 48 56 38"/><path d="M42 2 V10 M8 32 H22 M62 32 H76"/>'},
{id:'valve-manual',name:'Válvula manual',cat:'Válvulas',desc:'Válvula de aislamiento manual.',svg:'<path d="M8 30 H30 L42 18 L54 30 L42 42 L30 30 H76"/><path d="M42 18 V8 M32 8 H52"/>'},
{id:'valve-control',name:'Válvula de control',cat:'Válvulas',desc:'Válvula de control con actuador.',svg:'<path d="M8 32 H30 L42 20 L54 32 L42 44 L30 32 H76"/><path d="M42 20 V10 M32 10 H52 M36 4 H48"/>'},
{id:'valve-check',name:'Válvula de retención',cat:'Válvulas',desc:'Válvula check para evitar flujo inverso.',svg:'<path d="M8 30 H28 L48 18 V42 L28 30 H76"/><path d="M28 18 V42"/>'},
{id:'instrument-flow',name:'Indicador de flujo',cat:'Instrumentación',desc:'Instrumento de medición o indicación de flujo.',svg:'<circle cx="42" cy="24" r="15"/><path d="M8 42 H76 M42 39 V50"/><text x="42" y="28" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">F</text>'},
{id:'instrument-pressure',name:'Indicador de presión',cat:'Instrumentación',desc:'Instrumento de presión (PI).',svg:'<circle cx="42" cy="24" r="15"/><path d="M8 42 H76 M42 39 V50"/><text x="42" y="28" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">P</text>'},
{id:'instrument-temp',name:'Indicador de temperatura',cat:'Instrumentación',desc:'Instrumento de temperatura (TI).',svg:'<circle cx="42" cy="24" r="15"/><path d="M8 42 H76 M42 39 V50"/><text x="42" y="28" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">T</text>'},
{id:'instrument-level',name:'Indicador de nivel',cat:'Instrumentación',desc:'Instrumento de nivel (LI).',svg:'<circle cx="42" cy="24" r="15"/><path d="M8 42 H76 M42 39 V50"/><text x="42" y="28" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">L</text>'},
{id:'instrument-control',name:'Controlador',cat:'Instrumentación',desc:'Controlador de proceso (C).',svg:'<circle cx="42" cy="24" r="15"/><path d="M8 42 H76 M42 39 V50"/><text x="42" y="28" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">C</text>'},
{id:'stream-arrow',name:'Corriente con flecha',cat:'Corrientes',desc:'Línea de proceso con dirección de flujo.',svg:'<path d="M8 32 H68 M58 22 L68 32 L58 42"/>'},
{id:'stream-dashed',name:'Línea de señal',cat:'Corrientes',desc:'Línea discontinua para señal de instrumentación.',svg:'<path d="M8 32 H76" stroke-dasharray="4 3"/>'},
{id:'stream-cross',name:'Conector de corriente',cat:'Corrientes',desc:'Marcador numerado de corriente de proceso.',svg:'<path d="M8 32 H22 M62 32 H76"/><path d="M42 14 L60 32 L42 50 L24 32 Z"/><text x="42" y="35" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">1</text>'}
 ];
// Catálogo ampliado de símbolos PFD en español.
pfdSymbols.push(
{id:'compresor',name:'Compresor',cat:'Equipos',desc:'Símbolo PFD de compresor.',iconType:'rotating'},
{id:'compresor-reciprocante',name:'Compresor reciprocante',cat:'Equipos',desc:'Símbolo PFD de compresor reciprocante.',iconType:'rotating'},
{id:'compresor-centrifugo',name:'Compresor centrífugo',cat:'Equipos',desc:'Símbolo PFD de compresor centrífugo.',iconType:'rotating'},
{id:'compresor-tornillo',name:'Compresor de tornillo',cat:'Equipos',desc:'Símbolo PFD de compresor de tornillo.',iconType:'rotating'},
{id:'compresor-anillo-liquido',name:'Compresor de anillo líquido',cat:'Equipos',desc:'Símbolo PFD de compresor de anillo líquido.',iconType:'rotating'},
{id:'soplador',name:'Soplador',cat:'Equipos',desc:'Símbolo PFD de soplador.',iconType:'rotating'},
{id:'ventilador',name:'Ventilador centrífugo',cat:'Equipos',desc:'Símbolo PFD de ventilador centrífugo.',iconType:'rotating'},
{id:'turbina',name:'Turbina',cat:'Equipos',desc:'Símbolo PFD de turbina.',iconType:'rotating'},
{id:'turbina-vapor',name:'Turbina de vapor',cat:'Equipos',desc:'Símbolo PFD de turbina de vapor.',iconType:'rotating'},
{id:'bomba-diafragma',name:'Bomba de diafragma',cat:'Equipos',desc:'Símbolo PFD de bomba de diafragma.',iconType:'pump'},
{id:'bomba-engranajes',name:'Bomba de engranajes',cat:'Equipos',desc:'Símbolo PFD de bomba de engranajes.',iconType:'pump'},
{id:'bomba-piston',name:'Bomba de pistón',cat:'Equipos',desc:'Símbolo PFD de bomba de pistón.',iconType:'pump'},
{id:'bomba-tornillo',name:'Bomba de tornillo',cat:'Equipos',desc:'Símbolo PFD de bomba de tornillo.',iconType:'pump'},
{id:'bomba-dosificadora',name:'Bomba dosificadora',cat:'Equipos',desc:'Símbolo PFD de bomba dosificadora.',iconType:'pump'},
{id:'bomba-vacio',name:'Bomba de vacío',cat:'Equipos',desc:'Símbolo PFD de bomba de vacío.',iconType:'pump'},
{id:'bomba-sumergible',name:'Bomba sumergible',cat:'Equipos',desc:'Símbolo PFD de bomba sumergible.',iconType:'pump'},
{id:'bomba-vertical',name:'Bomba vertical',cat:'Equipos',desc:'Símbolo PFD de bomba vertical.',iconType:'pump'},
{id:'bomba-peristaltica',name:'Bomba peristáltica',cat:'Equipos',desc:'Símbolo PFD de bomba peristáltica.',iconType:'pump'},
{id:'tanque-abierto',name:'Tanque abierto',cat:'Equipos',desc:'Símbolo PFD de tanque abierto.',iconType:'vessel'},
{id:'tanque-conico',name:'Tanque de fondo cónico',cat:'Equipos',desc:'Símbolo PFD de tanque de fondo cónico.',iconType:'vessel'},
{id:'tanque-esferico',name:'Tanque esférico',cat:'Equipos',desc:'Símbolo PFD de tanque esférico.',iconType:'vessel'},
{id:'tanque-presion',name:'Tanque presurizado',cat:'Equipos',desc:'Símbolo PFD de tanque presurizado.',iconType:'vessel'},
{id:'recipiente-vertical',name:'Recipiente vertical',cat:'Equipos',desc:'Símbolo PFD de recipiente vertical.',iconType:'vessel'},
{id:'recipiente-horizontal',name:'Recipiente horizontal',cat:'Equipos',desc:'Símbolo PFD de recipiente horizontal.',iconType:'vessel'},
{id:'recipiente-chaqueta',name:'Recipiente con chaqueta',cat:'Equipos',desc:'Símbolo PFD de recipiente con chaqueta.',iconType:'reactor'},
{id:'reactor-agitado',name:'Reactor agitado',cat:'Equipos',desc:'Símbolo PFD de reactor agitado.',iconType:'reactor'},
{id:'reactor-continuo',name:'Reactor continuo',cat:'Equipos',desc:'Símbolo PFD de reactor continuo.',iconType:'reactor'},
{id:'reactor-batch',name:'Reactor por lotes',cat:'Equipos',desc:'Símbolo PFD de reactor por lotes.',iconType:'reactor'},
{id:'columna',name:'Columna de separación',cat:'Equipos',desc:'Símbolo PFD de columna de separación.',iconType:'tower'},
{id:'columna-destilacion',name:'Columna de destilación',cat:'Equipos',desc:'Símbolo PFD de columna de destilación.',iconType:'tower'},
{id:'columna-absorcion',name:'Columna de absorción',cat:'Equipos',desc:'Símbolo PFD de columna de absorción.',iconType:'tower'},
{id:'columna-empaque',name:'Columna empacada',cat:'Equipos',desc:'Símbolo PFD de columna empacada.',iconType:'tower'},
{id:'columna-platos',name:'Columna de platos',cat:'Equipos',desc:'Símbolo PFD de columna de platos.',iconType:'tower'},
{id:'decantador',name:'Decantador',cat:'Equipos',desc:'Símbolo PFD de decantador.',iconType:'separator'},
{id:'separador-gas-liquido',name:'Separador gas-líquido',cat:'Equipos',desc:'Símbolo PFD de separador gas-líquido.',iconType:'separator'},
{id:'separador-trifasico',name:'Separador trifásico',cat:'Equipos',desc:'Símbolo PFD de separador trifásico.',iconType:'separator'},
{id:'ciclón',name:'Ciclón',cat:'Equipos',desc:'Símbolo PFD de ciclón.',iconType:'separator'},
{id:'centrifuga',name:'Centrífuga',cat:'Equipos',desc:'Símbolo PFD de centrífuga.',iconType:'separator'},
{id:'centrifuga-discos',name:'Centrífuga de discos',cat:'Equipos',desc:'Símbolo PFD de centrífuga de discos.',iconType:'separator'},
{id:'centrifuga-tamiz',name:'Centrífuga de tamiz',cat:'Equipos',desc:'Símbolo PFD de centrífuga de tamiz.',iconType:'separator'},
{id:'filtro-prensa',name:'Filtro prensa',cat:'Equipos',desc:'Símbolo PFD de filtro prensa.',iconType:'filter'},
{id:'filtro-cartucho',name:'Filtro de cartucho',cat:'Equipos',desc:'Símbolo PFD de filtro de cartucho.',iconType:'filter'},
{id:'filtro-bolsas',name:'Filtro de bolsas',cat:'Equipos',desc:'Símbolo PFD de filtro de bolsas.',iconType:'filter'},
{id:'filtro-tambor',name:'Filtro de tambor',cat:'Equipos',desc:'Símbolo PFD de filtro de tambor.',iconType:'filter'},
{id:'filtro-membrana',name:'Filtro de membrana',cat:'Equipos',desc:'Símbolo PFD de filtro de membrana.',iconType:'filter'},
{id:'criba',name:'Criba vibratoria',cat:'Equipos',desc:'Símbolo PFD de criba vibratoria.',iconType:'filter'},
{id:'molino',name:'Molino',cat:'Equipos',desc:'Símbolo PFD de molino.',iconType:'crusher'},
{id:'triturador-mandibulas',name:'Trituradora de mandíbulas',cat:'Equipos',desc:'Símbolo PFD de trituradora de mandíbulas.',iconType:'crusher'},
{id:'triturador-cono',name:'Trituradora de cono',cat:'Equipos',desc:'Símbolo PFD de trituradora de cono.',iconType:'crusher'},
{id:'triturador-rodillos',name:'Trituradora de rodillos',cat:'Equipos',desc:'Símbolo PFD de trituradora de rodillos.',iconType:'crusher'},
{id:'triturador-martillos',name:'Trituradora de martillos',cat:'Equipos',desc:'Símbolo PFD de trituradora de martillos.',iconType:'crusher'},
{id:'triturador-impacto',name:'Trituradora de impacto',cat:'Equipos',desc:'Símbolo PFD de trituradora de impacto.',iconType:'crusher'},
{id:'mezclador-estatico',name:'Mezclador estático',cat:'Equipos',desc:'Símbolo PFD de mezclador estático.',iconType:'mixer'},
{id:'mezclador-chorro',name:'Mezclador de chorro',cat:'Equipos',desc:'Símbolo PFD de mezclador de chorro.',iconType:'mixer'},
{id:'agitador',name:'Agitador',cat:'Equipos',desc:'Símbolo PFD de agitador.',iconType:'mixer'},
{id:'amasadora',name:'Amasadora',cat:'Equipos',desc:'Símbolo PFD de amasadora.',iconType:'mixer'},
{id:'extrusor',name:'Extrusor',cat:'Equipos',desc:'Símbolo PFD de extrusor.',iconType:'mixer'},
{id:'secador-rotatorio',name:'Secador rotatorio',cat:'Equipos',desc:'Símbolo PFD de secador rotatorio.',iconType:'heater'},
{id:'secador-bandejas',name:'Secador de bandejas',cat:'Equipos',desc:'Símbolo PFD de secador de bandejas.',iconType:'heater'},
{id:'secador-lecho-fluidizado',name:'Secador de lecho fluidizado',cat:'Equipos',desc:'Símbolo PFD de secador de lecho fluidizado.',iconType:'heater'},
{id:'horno',name:'Horno industrial',cat:'Equipos',desc:'Símbolo PFD de horno industrial.',iconType:'heater'},
{id:'caldera',name:'Caldera',cat:'Equipos',desc:'Símbolo PFD de caldera.',iconType:'heater'},
{id:'quemador',name:'Quemador',cat:'Equipos',desc:'Símbolo PFD de quemador.',iconType:'heater'},
{id:'torre-enfriamiento',name:'Torre de enfriamiento',cat:'Equipos',desc:'Símbolo PFD de torre de enfriamiento.',iconType:'heater'},
{id:'evaporador-film',name:'Evaporador de película',cat:'Equipos',desc:'Símbolo PFD de evaporador de película.',iconType:'exchanger'},
{id:'evaporador-multiefecto',name:'Evaporador de múltiple efecto',cat:'Equipos',desc:'Símbolo PFD de evaporador de múltiple efecto.',iconType:'exchanger'},
{id:'condensador',name:'Condensador',cat:'Equipos',desc:'Símbolo PFD de condensador.',iconType:'exchanger'},
{id:'reboiler',name:'Rehervidor',cat:'Equipos',desc:'Símbolo PFD de rehervidor.',iconType:'exchanger'},
{id:'intercambiador-doble-tubo',name:'Intercambiador de doble tubo',cat:'Equipos',desc:'Símbolo PFD de intercambiador de doble tubo.',iconType:'exchanger'},
{id:'intercambiador-espiral',name:'Intercambiador espiral',cat:'Equipos',desc:'Símbolo PFD de intercambiador espiral.',iconType:'exchanger'},
{id:'intercambiador-aire',name:'Intercambiador enfriado por aire',cat:'Equipos',desc:'Símbolo PFD de intercambiador enfriado por aire.',iconType:'exchanger'},
{id:'intercambiador-serpentín',name:'Intercambiador de serpentín',cat:'Equipos',desc:'Símbolo PFD de intercambiador de serpentín.',iconType:'exchanger'},
{id:'intercambiador-haz-tubos',name:'Intercambiador de haz de tubos',cat:'Equipos',desc:'Símbolo PFD de intercambiador de haz de tubos.',iconType:'exchanger'},
{id:'intercambiador-placas-finas',name:'Intercambiador de placas',cat:'Equipos',desc:'Símbolo PFD de intercambiador de placas.',iconType:'exchanger'},
{id:'pasteurizador',name:'Pasteurizador',cat:'Equipos',desc:'Símbolo PFD de pasteurizador.',iconType:'exchanger'},
{id:'homogeneizador-alta',name:'Homogeneizador de alta presión',cat:'Equipos',desc:'Símbolo PFD de homogeneizador de alta presión.',iconType:'rotating'},
{id:'empaquetadora',name:'Empaquetadora',cat:'Equipos',desc:'Símbolo PFD de empaquetadora.',iconType:'misc'},
{id:'llenadora',name:'Llenadora',cat:'Equipos',desc:'Símbolo PFD de llenadora.',iconType:'misc'},
{id:'transportador',name:'Transportador',cat:'Equipos',desc:'Símbolo PFD de transportador.',iconType:'misc'},
{id:'transportador-tornillo',name:'Transportador de tornillo',cat:'Equipos',desc:'Símbolo PFD de transportador de tornillo.',iconType:'misc'},
{id:'elevador-cangilones',name:'Elevador de cangilones',cat:'Equipos',desc:'Símbolo PFD de elevador de cangilones.',iconType:'misc'},
{id:'tolva',name:'Tolva',cat:'Equipos',desc:'Símbolo PFD de tolva.',iconType:'vessel'},
{id:'silo',name:'Silo',cat:'Equipos',desc:'Símbolo PFD de silo.',iconType:'vessel'},
{id:'chimenea',name:'Chimenea',cat:'Equipos',desc:'Símbolo PFD de chimenea.',iconType:'misc'},
{id:'antorcha',name:'Antorcha de venteo',cat:'Equipos',desc:'Símbolo PFD de antorcha de venteo.',iconType:'misc'},
{id:'eyector',name:'Eyector',cat:'Equipos',desc:'Símbolo PFD de eyector.',iconType:'rotating'},
{id:'eductor',name:'Eductor',cat:'Equipos',desc:'Símbolo PFD de eductor.',iconType:'rotating'},
{id:'trampa-vapor',name:'Trampa de vapor',cat:'Equipos',desc:'Símbolo PFD de trampa de vapor.',iconType:'valve'},
{id:'filtro-y',name:'Filtro tipo Y',cat:'Equipos',desc:'Símbolo PFD de filtro tipo y.',iconType:'filter'},
{id:'valvula-compuerta',name:'Válvula de compuerta',cat:'Válvulas',desc:'Símbolo PFD de válvula de compuerta.',iconType:'valve'},
{id:'valvula-globo',name:'Válvula de globo',cat:'Válvulas',desc:'Símbolo PFD de válvula de globo.',iconType:'valve'},
{id:'valvula-aguja',name:'Válvula de aguja',cat:'Válvulas',desc:'Símbolo PFD de válvula de aguja.',iconType:'valve'},
{id:'valvula-bola',name:'Válvula de bola',cat:'Válvulas',desc:'Símbolo PFD de válvula de bola.',iconType:'valve'},
{id:'valvula-mariposa',name:'Válvula mariposa',cat:'Válvulas',desc:'Símbolo PFD de válvula mariposa.',iconType:'valve'},
{id:'valvula-macho',name:'Válvula de macho',cat:'Válvulas',desc:'Símbolo PFD de válvula de macho.',iconType:'valve'},
{id:'valvula-diafragma',name:'Válvula de diafragma',cat:'Válvulas',desc:'Símbolo PFD de válvula de diafragma.',iconType:'valve'},
{id:'valvula-retencion',name:'Válvula check / retención',cat:'Válvulas',desc:'Símbolo PFD de válvula check / retención.',iconType:'valve'},
{id:'valvula-check-resorte',name:'Válvula check con resorte',cat:'Válvulas',desc:'Símbolo PFD de válvula check con resorte.',iconType:'valve'},
{id:'valvula-alivio',name:'Válvula de alivio',cat:'Válvulas',desc:'Símbolo PFD de válvula de alivio.',iconType:'valve'},
{id:'valvula-seguridad',name:'Válvula de seguridad',cat:'Válvulas',desc:'Símbolo PFD de válvula de seguridad.',iconType:'valve'},
{id:'valvula-solenoide',name:'Válvula solenoide',cat:'Válvulas',desc:'Símbolo PFD de válvula solenoide.',iconType:'valve'},
{id:'valvula-tres-vias',name:'Válvula de tres vías',cat:'Válvulas',desc:'Símbolo PFD de válvula de tres vías.',iconType:'valve'},
{id:'valvula-cuatro-vias',name:'Válvula de cuatro vías',cat:'Válvulas',desc:'Símbolo PFD de válvula de cuatro vías.',iconType:'valve'},
{id:'valvula-control-neumatica',name:'Válvula de control neumática',cat:'Válvulas',desc:'Símbolo PFD de válvula de control neumática.',iconType:'valve'},
{id:'valvula-control-electrica',name:'Válvula de control eléctrica',cat:'Válvulas',desc:'Símbolo PFD de válvula de control eléctrica.',iconType:'valve'},
{id:'valvula-angular',name:'Válvula angular',cat:'Válvulas',desc:'Símbolo PFD de válvula angular.',iconType:'valve'},
{id:'valvula-pinch',name:'Válvula pinch',cat:'Válvulas',desc:'Símbolo PFD de válvula pinch.',iconType:'valve'},
{id:'valvula-purga',name:'Válvula de purga',cat:'Válvulas',desc:'Símbolo PFD de válvula de purga.',iconType:'valve'},
{id:'valvula-drenaje',name:'Válvula de drenaje',cat:'Válvulas',desc:'Símbolo PFD de válvula de drenaje.',iconType:'valve'},
{id:'valvula-venteo',name:'Válvula de venteo',cat:'Válvulas',desc:'Símbolo PFD de válvula de venteo.',iconType:'valve'},
{id:'valvula-reductora',name:'Válvula reductora de presión',cat:'Válvulas',desc:'Símbolo PFD de válvula reductora de presión.',iconType:'valve'},
{id:'valvula-flotador',name:'Válvula de flotador',cat:'Válvulas',desc:'Símbolo PFD de válvula de flotador.',iconType:'valve'},
{id:'valvula-manual-volante',name:'Válvula manual con volante',cat:'Válvulas',desc:'Símbolo PFD de válvula manual con volante.',iconType:'valve'},
{id:'valvula-actuador',name:'Válvula con actuador',cat:'Válvulas',desc:'Símbolo PFD de válvula con actuador.',iconType:'valve'},
{id:'indicador',name:'Indicador genérico',cat:'Instrumentación',desc:'Símbolo PFD de indicador genérico.',iconType:'instrument'},
{id:'transmisor',name:'Transmisor genérico',cat:'Instrumentación',desc:'Símbolo PFD de transmisor genérico.',iconType:'instrument'},
{id:'registrador',name:'Registrador genérico',cat:'Instrumentación',desc:'Símbolo PFD de registrador genérico.',iconType:'instrument'},
{id:'controlador',name:'Controlador genérico',cat:'Instrumentación',desc:'Símbolo PFD de controlador genérico.',iconType:'instrument'},
{id:'elemento-medicion',name:'Elemento de medición',cat:'Instrumentación',desc:'Símbolo PFD de elemento de medición.',iconType:'instrument'},
{id:'indicador-temperatura',name:'Indicador de temperatura TI',cat:'Instrumentación',desc:'Símbolo PFD de indicador de temperatura ti.',iconType:'instrument'},
{id:'transmisor-temperatura',name:'Transmisor de temperatura TT',cat:'Instrumentación',desc:'Símbolo PFD de transmisor de temperatura tt.',iconType:'instrument'},
{id:'controlador-temperatura',name:'Controlador de temperatura TC',cat:'Instrumentación',desc:'Símbolo PFD de controlador de temperatura tc.',iconType:'instrument'},
{id:'registrador-temperatura',name:'Registrador de temperatura TR',cat:'Instrumentación',desc:'Símbolo PFD de registrador de temperatura tr.',iconType:'instrument'},
{id:'indicador-presion',name:'Indicador de presión PI',cat:'Instrumentación',desc:'Símbolo PFD de indicador de presión pi.',iconType:'instrument'},
{id:'transmisor-presion',name:'Transmisor de presión PT',cat:'Instrumentación',desc:'Símbolo PFD de transmisor de presión pt.',iconType:'instrument'},
{id:'controlador-presion',name:'Controlador de presión PC',cat:'Instrumentación',desc:'Símbolo PFD de controlador de presión pc.',iconType:'instrument'},
{id:'registrador-presion',name:'Registrador de presión PR',cat:'Instrumentación',desc:'Símbolo PFD de registrador de presión pr.',iconType:'instrument'},
{id:'indicador-nivel',name:'Indicador de nivel LI',cat:'Instrumentación',desc:'Símbolo PFD de indicador de nivel li.',iconType:'instrument'},
{id:'transmisor-nivel',name:'Transmisor de nivel LT',cat:'Instrumentación',desc:'Símbolo PFD de transmisor de nivel lt.',iconType:'instrument'},
{id:'controlador-nivel',name:'Controlador de nivel LC',cat:'Instrumentación',desc:'Símbolo PFD de controlador de nivel lc.',iconType:'instrument'},
{id:'registrador-nivel',name:'Registrador de nivel LR',cat:'Instrumentación',desc:'Símbolo PFD de registrador de nivel lr.',iconType:'instrument'},
{id:'alarma-nivel',name:'Alarma de nivel LA',cat:'Instrumentación',desc:'Símbolo PFD de alarma de nivel la.',iconType:'instrument'},
{id:'indicador-flujo',name:'Indicador de flujo FI',cat:'Instrumentación',desc:'Símbolo PFD de indicador de flujo fi.',iconType:'instrument'},
{id:'transmisor-flujo',name:'Transmisor de flujo FT',cat:'Instrumentación',desc:'Símbolo PFD de transmisor de flujo ft.',iconType:'instrument'},
{id:'controlador-flujo',name:'Controlador de flujo FC',cat:'Instrumentación',desc:'Símbolo PFD de controlador de flujo fc.',iconType:'instrument'},
{id:'registrador-flujo',name:'Registrador de flujo FR',cat:'Instrumentación',desc:'Símbolo PFD de registrador de flujo fr.',iconType:'instrument'},
{id:'medidor-caudal',name:'Medidor de caudal',cat:'Instrumentación',desc:'Símbolo PFD de medidor de caudal.',iconType:'instrument'},
{id:'manometro',name:'Manómetro',cat:'Instrumentación',desc:'Símbolo PFD de manómetro.',iconType:'instrument'},
{id:'termometro',name:'Termómetro',cat:'Instrumentación',desc:'Símbolo PFD de termómetro.',iconType:'instrument'},
{id:'rotametro',name:'Rotámetro',cat:'Instrumentación',desc:'Símbolo PFD de rotámetro.',iconType:'instrument'},
{id:'analizador-ph',name:'Analizador de pH',cat:'Instrumentación',desc:'Símbolo PFD de analizador de ph.',iconType:'instrument'},
{id:'analizador-conductividad',name:'Analizador de conductividad',cat:'Instrumentación',desc:'Símbolo PFD de analizador de conductividad.',iconType:'instrument'},
{id:'analizador-composicion',name:'Analizador de composición',cat:'Instrumentación',desc:'Símbolo PFD de analizador de composición.',iconType:'instrument'},
{id:'detector-gas',name:'Detector de gas',cat:'Instrumentación',desc:'Símbolo PFD de detector de gas.',iconType:'instrument'},
{id:'alarma',name:'Alarma de proceso',cat:'Instrumentación',desc:'Símbolo PFD de alarma de proceso.',iconType:'instrument'},
{id:'interlock',name:'Interbloqueo / enclavamiento',cat:'Instrumentación',desc:'Símbolo PFD de interbloqueo / enclavamiento.',iconType:'instrument'},
{id:'elemento-orificio',name:'Placa de orificio',cat:'Instrumentación',desc:'Símbolo PFD de placa de orificio.',iconType:'instrument'},
{id:'sensor',name:'Sensor',cat:'Instrumentación',desc:'Símbolo PFD de sensor.',iconType:'instrument'},
{id:'instrumento-local',name:'Instrumento local',cat:'Instrumentación',desc:'Símbolo PFD de instrumento local.',iconType:'instrument'},
{id:'instrumento-panel',name:'Instrumento en panel',cat:'Instrumentación',desc:'Símbolo PFD de instrumento en panel.',iconType:'instrument'},
{id:'instrumento-computador',name:'Instrumento en sistema',cat:'Instrumentación',desc:'Símbolo PFD de instrumento en sistema.',iconType:'instrument'},
{id:'corriente-proceso',name:'Corriente de proceso',cat:'Corrientes',desc:'Símbolo PFD de corriente de proceso.',iconType:'stream'},
{id:'corriente-flecha',name:'Línea con flecha de flujo',cat:'Corrientes',desc:'Símbolo PFD de línea con flecha de flujo.',iconType:'stream'},
{id:'corriente-doble',name:'Línea de flujo doble',cat:'Corrientes',desc:'Símbolo PFD de línea de flujo doble.',iconType:'stream'},
{id:'corriente-entrada',name:'Entrada de proceso',cat:'Corrientes',desc:'Símbolo PFD de entrada de proceso.',iconType:'stream'},
{id:'corriente-salida',name:'Salida de proceso',cat:'Corrientes',desc:'Símbolo PFD de salida de proceso.',iconType:'stream'},
{id:'corriente-gas',name:'Corriente gaseosa',cat:'Corrientes',desc:'Símbolo PFD de corriente gaseosa.',iconType:'stream'},
{id:'corriente-liquido',name:'Corriente líquida',cat:'Corrientes',desc:'Símbolo PFD de corriente líquida.',iconType:'stream'},
{id:'corriente-vapor',name:'Corriente de vapor',cat:'Corrientes',desc:'Símbolo PFD de corriente de vapor.',iconType:'stream'},
{id:'corriente-solido',name:'Corriente de sólidos',cat:'Corrientes',desc:'Símbolo PFD de corriente de sólidos.',iconType:'stream'},
{id:'corriente-utility',name:'Línea de servicio / utilidad',cat:'Corrientes',desc:'Símbolo PFD de línea de servicio / utilidad.',iconType:'stream'},
{id:'linea-senal',name:'Línea de señal discontinua',cat:'Corrientes',desc:'Símbolo PFD de línea de señal discontinua.',iconType:'stream'},
{id:'senal-neumatica',name:'Señal neumática',cat:'Corrientes',desc:'Símbolo PFD de señal neumática.',iconType:'stream'},
{id:'senal-electrica',name:'Señal eléctrica',cat:'Corrientes',desc:'Símbolo PFD de señal eléctrica.',iconType:'stream'},
{id:'senal-digital',name:'Señal digital',cat:'Corrientes',desc:'Símbolo PFD de señal digital.',iconType:'stream'},
{id:'conector',name:'Conector de corriente',cat:'Corrientes',desc:'Símbolo PFD de conector de corriente.',iconType:'stream'},
{id:'numero-corriente',name:'Número de corriente',cat:'Corrientes',desc:'Símbolo PFD de número de corriente.',iconType:'stream'},
{id:'entrada-flecha',name:'Flecha de entrada',cat:'Corrientes',desc:'Símbolo PFD de flecha de entrada.',iconType:'stream'},
{id:'salida-flecha',name:'Flecha de salida',cat:'Corrientes',desc:'Símbolo PFD de flecha de salida.',iconType:'stream'},
{id:'cruce-sin-conexion',name:'Cruce sin conexión',cat:'Corrientes',desc:'Símbolo PFD de cruce sin conexión.',iconType:'stream'},
{id:'union-lineas',name:'Unión de líneas',cat:'Corrientes',desc:'Símbolo PFD de unión de líneas.',iconType:'stream'},
{id:'continuacion',name:'Continuación fuera de página',cat:'Corrientes',desc:'Símbolo PFD de continuación fuera de página.',iconType:'stream'},
{id:'limite-bateria',name:'Límite de batería',cat:'Corrientes',desc:'Símbolo PFD de límite de batería.',iconType:'stream'},
{id:'reductor',name:'Reductor de tubería',cat:'Accesorios y otros',desc:'Símbolo PFD de reductor de tubería.',iconType:'misc'},
{id:'expansion',name:'Expansión de tubería',cat:'Accesorios y otros',desc:'Símbolo PFD de expansión de tubería.',iconType:'misc'},
{id:'brida',name:'Brida',cat:'Accesorios y otros',desc:'Símbolo PFD de brida.',iconType:'misc'},
{id:'conexion-rapida',name:'Conexión rápida',cat:'Accesorios y otros',desc:'Símbolo PFD de conexión rápida.',iconType:'misc'},
{id:'manguera',name:'Manguera flexible',cat:'Accesorios y otros',desc:'Símbolo PFD de manguera flexible.',iconType:'misc'},
{id:'boquilla',name:'Boquilla',cat:'Accesorios y otros',desc:'Símbolo PFD de boquilla.',iconType:'misc'},
{id:'spray',name:'Boquilla pulverizadora',cat:'Accesorios y otros',desc:'Símbolo PFD de boquilla pulverizadora.',iconType:'misc'},
{id:'distribuidor',name:'Distribuidor',cat:'Accesorios y otros',desc:'Símbolo PFD de distribuidor.',iconType:'misc'},
{id:'colector',name:'Colector / manifold',cat:'Accesorios y otros',desc:'Símbolo PFD de colector / manifold.',iconType:'misc'},
{id:'drenaje',name:'Drenaje',cat:'Accesorios y otros',desc:'Símbolo PFD de drenaje.',iconType:'misc'},
{id:'venteo',name:'Venteo',cat:'Accesorios y otros',desc:'Símbolo PFD de venteo.',iconType:'misc'},
{id:'entrada-hombre',name:'Boca de hombre',cat:'Accesorios y otros',desc:'Símbolo PFD de boca de hombre.',iconType:'misc'},
{id:'muestra',name:'Punto de toma de muestra',cat:'Accesorios y otros',desc:'Símbolo PFD de punto de toma de muestra.',iconType:'misc'},
{id:'silenciador',name:'Silenciador',cat:'Accesorios y otros',desc:'Símbolo PFD de silenciador.',iconType:'misc'},
{id:'rompe-vacio',name:'Rompe vacío',cat:'Accesorios y otros',desc:'Símbolo PFD de rompe vacío.',iconType:'valve'},
{id:'arrestallamas',name:'Arrestallamas',cat:'Accesorios y otros',desc:'Símbolo PFD de arrestallamas.',iconType:'misc'},
{id:'filtro-canasta',name:'Filtro de canasta',cat:'Accesorios y otros',desc:'Símbolo PFD de filtro de canasta.',iconType:'filter'},
{id:'trampa-condensado',name:'Trampa de condensado',cat:'Accesorios y otros',desc:'Símbolo PFD de trampa de condensado.',iconType:'valve'},
{id:'conexion-instrumento',name:'Conexión de instrumento',cat:'Accesorios y otros',desc:'Símbolo PFD de conexión de instrumento.',iconType:'misc'},
{id:'motor',name:'Motor eléctrico',cat:'Accesorios y otros',desc:'Símbolo PFD de motor eléctrico.',iconType:'rotating'},
{id:'generador',name:'Generador',cat:'Accesorios y otros',desc:'Símbolo PFD de generador.',iconType:'rotating'},
{id:'ventilacion',name:'Ventilación',cat:'Accesorios y otros',desc:'Símbolo PFD de ventilación.',iconType:'misc'},
{id:'bypass',name:'Bypass',cat:'Accesorios y otros',desc:'Símbolo PFD de bypass.',iconType:'stream'},
{id:'purga',name:'Purga',cat:'Accesorios y otros',desc:'Símbolo PFD de purga.',iconType:'stream'},
{id:'recirculacion',name:'Recirculación',cat:'Accesorios y otros',desc:'Símbolo PFD de recirculación.',iconType:'stream'}
);
let pfdSelectedSymbol='pump';let pfdActiveCategory='Todos';
function pfdSvg(symbol,large=false){
 const palettes={Equipos:['#2463eb','#dbeafe'],Válvulas:['#e17a22','#ffedd5'],Instrumentación:['#0f9b8e','#ccfbf1'],Corrientes:['#7c3aed','#ede9fe'],'Accesorios y otros':['#db2777','#fce7f3']};
 const [accent,soft]=palettes[symbol.cat]||['#2563eb','#dbeafe'];
 const type=symbol.iconType||({pump:'pump', 'pump-positive':'pump',tank:'vessel','tank-horizontal':'vessel','heat-shell':'exchanger','heat-plate':'exchanger',heater:'heater',cooler:'exchanger',filter:'filter',separator:'separator',mixer:'mixer',homogenizer:'rotating',pasteurizer:'exchanger',evaporator:'exchanger','valve-manual':'valve','valve-control':'valve','valve-check':'valve', 'instrument-flow':'instrument','instrument-pressure':'instrument','instrument-temp':'instrument','instrument-level':'instrument','instrument-control':'instrument','stream-arrow':'stream','stream-dashed':'stream','stream-cross':'stream'})[symbol.id]||'misc';
 let shape='';
 if(type==='pump'||type==='rotating') shape=`<circle cx="42" cy="31" r="18" fill="${soft}" stroke="${accent}"/><path d="M31 39 Q48 35 49 21 Q36 21 31 39Z" fill="${accent}" stroke="${accent}"/><path d="M8 31H24M60 31H76M42 13V7H61V13" stroke="#34495e"/>`;
 else if(type==='vessel') shape=`<path d="M24 13 Q42 4 60 13 V49 Q42 59 24 49Z" fill="${soft}" stroke="${accent}"/><path d="M24 18 Q42 26 60 18 M42 3V13 M42 49V57" stroke="${accent}"/>`;
 else if(type==='reactor'||type==='mixer') shape=`<rect x="23" y="13" width="38" height="40" rx="5" fill="${soft}" stroke="${accent}"/><path d="M42 4V34 M31 34H53 M34 28L50 40 M50 28L34 40" stroke="${accent}"/><path d="M8 33H23M61 33H76" stroke="#34495e"/>`;
 else if(type==='tower') shape=`<path d="M29 7H55L60 55H24Z" fill="${soft}" stroke="${accent}"/><path d="M30 18H54M28 27H56M27 36H57M26 45H58" stroke="${accent}"/><path d="M8 31H24M60 31H76" stroke="#34495e"/>`;
 else if(type==='exchanger'||type==='heater') shape=`<rect x="20" y="10" width="44" height="44" rx="4" fill="${soft}" stroke="${accent}"/><path d="M27 16L57 16L27 26L57 26L27 36L57 36L27 46L57 46" stroke="${accent}"/><path d="M8 32H20M64 32H76" stroke="#34495e"/>`;
 else if(type==='filter'||type==='separator') shape=`<path d="M25 9H59V45Q42 57 25 45Z" fill="${soft}" stroke="${accent}"/><path d="M29 18H55M29 27H55M29 36H55" stroke="${accent}"/><path d="M8 31H25M59 31H76" stroke="#34495e"/>`;
 else if(type==='crusher') shape=`<path d="M19 13H65L57 49H27Z" fill="${soft}" stroke="${accent}"/><path d="M30 21L54 41M54 21L30 41" stroke="${accent}" stroke-width="2.5"/><path d="M8 31H19M65 31H76" stroke="#34495e"/>`;
 else if(type==='valve') shape=`<path d="M8 32H30L42 19L54 32L42 45L30 32H76" stroke="${accent}"/><path d="M42 19V8M31 8H53" stroke="#34495e"/><circle cx="42" cy="32" r="3" fill="${accent}"/>`;
 else if(type==='instrument') shape=`<circle cx="42" cy="25" r="16" fill="${soft}" stroke="${accent}"/><text x="42" y="29" text-anchor="middle" font-size="11" font-weight="700" fill="${accent}" stroke="none">${escapeHtml((symbol.name.match(/\b(T|P|F|L|C|A|I|R)\b/)||['','I'])[1])}</text><path d="M8 43H76M42 41V52" stroke="#34495e"/>`;
 else if(type==='stream') shape=`<path d="M8 32H68M58 22L68 32L58 42" stroke="${accent}" stroke-width="2.4"/><circle cx="42" cy="32" r="5" fill="${soft}" stroke="${accent}"/>`;
 else if(type==='misc') shape=`<rect x="24" y="13" width="36" height="38" rx="4" fill="${soft}" stroke="${accent}"/><path d="M30 20H54M30 28H54M30 36H54M8 32H24M60 32H76" stroke="${accent}"/>`;
 else shape=symbol.svg||'';
 return `<svg viewBox="0 0 84 64" role="img" aria-label="${escapeHtml(symbol.name)}" fill="none" stroke="#34495e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${shape}</svg>`;
}



let pfdEditableDiagram=null,pfdSelectedNode=null,pfdScale=1,pfdDrag=null;
function pfdDefaultDiagram(){
 const a=[];const add=(id,type,label,x,y,w=54,h=44,tag='')=>a.push({id,type,label,x,y,w,h,tag});
 // ROW 1: raw milk reception -> screening -> thermal treatment -> separator -> storage
 add('raw','source','LECHE CRUDA',45,155,42,52); add('v101','valve','V-101',145,180,34,34); add('num1','diamond','1',205,183,30,28); add('p101','pump','P-101',270,172,58,48); add('tk101','tank','TK-101',365,165,100,68); add('lc101','instrument','LC-101',392,105,46,46,'LC');
 add('vc101','valve','VC-101',500,180,34,34); add('f101','filter','F-101',560,167,70,54); add('v102','valve','V-102',655,180,34,34); add('num2','diamond','2',710,183,30,28); add('p102','pump','P-102',775,172,58,48); add('v103','valve','V-103',855,180,34,34); add('he101','heat','H-E101',915,160,64,72); add('tc101','instrument','TC-101',924,103,46,46,'TC');
 add('vc102','valve','VC-102',1010,180,34,34); add('num3','diamond','3',1065,183,30,28); add('d101','separator','D-101',1125,153,64,82); add('lir102','instrument','LIR-102',1134,100,46,46,'LIR'); add('v111','valve','V-111',1230,180,34,34); add('num11','diamond','11',1285,183,30,28); add('tk103','tank','TK-103',1350,160,100,70); add('lc104','instrument','LC-104',1377,103,46,46,'LC');
 // ROW 2: separator outlet -> balance/storage tank -> HTST return leftward
 add('vc103','valve','VC-103',1140,390,34,34); add('num4','diamond','4',1142,445,30,28); add('p103','pump','P-103',1125,495,58,48); add('vc104','valve','VC-104',1140,560,34,34); add('tk102','tank','TK-102',1080,590,100,70); add('lc102','instrument','LC-102',1107,665,46,46,'LC');
 add('p104','pump','P-104',960,600,58,48); add('v104','valve','V-104',900,605,34,34); add('num5','diamond','5',845,608,30,28); add('p105','pump','P-105',785,600,58,48); add('vc105','valve','VC-105',725,605,34,34); add('num6','diamond','6',670,608,30,28); add('he103','heat','H-E103',590,590,70,58); add('tcr101','instrument','TCR-101',602,530,46,46,'TCR');
 add('he102','heat','H-E102',480,590,70,58); add('vc106','valve','VC-106',410,605,34,34); add('he104','pasteurizer','H-E104',330,580,64,78); add('tcr102','instrument','TCR-102',339,525,46,46,'TCR'); add('v106','valve','V-106',250,605,34,34); add('p105b','pump','P-105',185,600,58,48); add('num7','diamond','7',120,608,30,28);
 // ROW 3: homogenization -> deodorization -> cooling -> cream packaging
 add('vc107','valve','VC-107',330,825,34,34); add('hr101','homogenizer','H-R101',395,805,68,72); add('tcr103','instrument','TCR-103',406,745,46,46,'TCR'); add('v107','valve','V-107',490,825,34,34); add('num8','diamond','8',545,828,30,28); add('p107','pump','P-107',605,820,58,48); add('fa101','tank','FA-101',690,805,76,82); add('fcr101','instrument','FCR-101',705,745,46,46,'FCR');
 add('vc108','valve','VC-108',795,825,34,34); add('num9','diamond','9',850,828,30,28); add('v108','valve','V-108',905,825,34,34); add('p108','pump','P-108',965,820,58,48); add('he105','heat','H-E105',1050,805,76,82); add('tcr104','instrument','TCR-104',1065,745,46,46,'TCR'); add('vc109','valve','VC-109',1145,825,34,34); add('p109','pump','P-109',1205,820,58,48); add('v110','valve','V-110',1270,825,34,34); add('num10','diamond','10',1325,828,30,28); add('pack1','packager','T-B102',1390,805,150,82); add('cream','product','CREMA DE LECHE',1565,820,52,52);
 // Right-side preheating vertical circuit
 add('vc110','valve','VC-110',1690,390,34,34); add('num12a','diamond','12',1692,440,30,28); add('p110','pump','P-110',1675,490,58,48); add('vc111','valve','VC-111',1690,555,34,34); add('he106','heat','H-E106',1670,600,68,94); add('tcr105','instrument','TCR-105',1740,630,46,46,'TCR'); add('v112','valve','V-112',1690,720,34,34); add('p111','pump','P-111',1675,770,58,48); add('num12b','diamond','12',1692,825,30,28); add('vc112','valve','VC-112',1690,875,34,34);
 // ROW 4: final HTST, homogenization, cooling, packaging — flow right-to-left
 add('v113','valve','V-113',1580,1010,34,34); add('num13','diamond','13',1525,1013,30,28); add('vc113','valve','VC-113',1465,1010,34,34); add('he107','pasteurizer','H-E107',1380,990,64,78); add('tcr106','instrument','TCR-106',1389,935,46,46,'TCR'); add('v114','valve','V-114',1300,1010,34,34); add('p112','pump','P-112',1240,1005,58,48); add('hr102','homogenizer','H-R102',1150,990,68,72); add('tcr107','instrument','TCR-107',1161,935,46,46,'TCR'); add('v115','valve','V-115',1070,1010,34,34); add('p113','pump','P-113',1010,1005,58,48); add('he108','heat','H-E108',925,990,76,82); add('tcr108','instrument','TCR-108',940,935,46,46,'TCR'); add('vc116','valve','VC-116',840,1010,34,34); add('p114','pump','P-114',780,1005,58,48); add('v116','valve','V-116',715,1010,34,34); add('pack2','packager','T-B101',605,990,150,82); add('pasteurized','product','LECHE PASTEURIZADA',400,1015,52,52);
 // Section headings are short and aligned to each band, never laid across the process line.
 [['s1a','RECEPCIÓN',85,285,150],['s1b','TAMIZADO',525,285,160],['s1c','TRATAMIENTO TÉRMICO',820,285,240],['s1d','DESCREMADO',1110,285,170],['s1e','ALMACENAMIENTO',1330,285,220],['s2','PASTEURIZACIÓN HTST',170,620,240],['s3a','HOMOGENIZACIÓN',340,930,200],['s3b','DESODORIZACIÓN',650,930,200],['s3c','ENFRIAMIENTO',1010,930,200],['s3d','ENVASADO DE CREMA',1390,930,230],['s4a','PRECALENTAMIENTO',1600,360,210],['s4b','PASTEURIZACIÓN FINAL',1320,1150,260],['s4c','HOMOGENIZACIÓN',1080,1150,210],['s4d','ENFRIAMIENTO',850,1150,170],['s4e','ENVASADO',600,1150,160]].forEach(([id,t,x,y,w])=>add(id,'text',t,x,y,w,24));

 // ORGANIZACIÓN VISUAL REFINADA: 4 bandas de proceso con separación clara.
 add('s2b','text','PRECALENTAMIENTO',470,620,250,24);
 const layout={
  // Banda 1 — Recepción, tamizado, tratamiento térmico, descremado y almacenamiento
  raw:[42,150],v101:[112,158],num1:[165,166],p101:[215,160],tk101:[300,142],lc101:[327,78],
  vc101:[430,160],f101:[478,148],v102:[570,160],num2:[620,166],p102:[670,160],v103:[745,160],
  he101:[800,142],tc101:[809,78],vc102:[900,160],num3:[950,166],d101:[1000,142],lir102:[1009,78],
  v111:[1090,160],num11:[1140,166],tk103:[1190,142],lc104:[1217,78],
  // Banda 2 — Retorno y tanque de balance; flujo hacia la izquierda
  vc103:[1000,355],num4:[1002,410],p103:[985,462],vc104:[1000,525],tk102:[920,555],lc102:[947,475],
  p104:[830,485],v104:[770,490],num5:[720,495],p105:[650,485],vc105:[590,490],num6:[540,495],
  he103:[455,491],tcr101:[467,405],he102:[350,491],vc106:[285,490],he104:[205,481],tcr102:[214,405],
  v106:[155,490],p105b:[100,485],num7:[80,495],
  // Banda 3 — Homogeneización, desodorización, enfriamiento y crema
  vc107:[78,775],hr101:[130,755],tcr103:[141,690],v107:[220,775],num8:[270,780],p107:[325,770],
  fa101:[400,755],fcr101:[415,690],vc108:[500,775],num9:[550,780],v108:[600,775],p108:[650,770],
  he105:[725,750],tcr104:[740,685],vc109:[830,775],p109:[880,770],v110:[945,775],num10:[995,780],
  pack1:[1050,755],cream:[1235,775],
  // Precalentamiento: circuito vertical independiente en extremo derecho
  vc110:[1570,345],num12a:[1572,400],p110:[1555,450],vc111:[1570,515],he106:[1550,560],
  tcr105:[1635,585],v112:[1570,665],p111:[1555,715],num12b:[1572,770],
  // Banda 4 — Pasteurización final, homogeneización, enfriamiento y envasado (flujo a la izquierda)
  vc112:[1570,1035],v113:[1495,1035],num13:[1445,1040],vc113:[1395,1035],he107:[1315,1015],
  tcr106:[1324,950],v114:[1240,1035],p112:[1180,1030],hr102:[1080,1015],tcr107:[1091,950],
  v115:[1000,1035],p113:[940,1030],he108:[850,1010],tcr108:[859,945],vc116:[770,1035],
  p114:[710,1030],v116:[640,1035],pack2:[490,1015],pasteurized:[330,1030],
  // Encabezados de bandas
  s1a:[60,285,170],s1b:[410,285,160],s1c:[690,285,280],s1d:[990,285,170],s1e:[1190,285,230],
  s2:[150,620,240],s2b:[450,620,250],s3a:[115,875,220],s3b:[390,875,220],s3c:[720,875,220],s3d:[1050,875,240],
  s4a:[1320,385,240],s4b:[1290,1175,260],s4c:[1070,1175,210],s4d:[830,1175,180],s4e:[480,1175,160]
 };
 for(const n of a){const v=layout[n.id];if(v){n.x=v[0];n.y=v[1];if(v.length>2)n.w=v[2]}}

 return a;
}
function pfdEsc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function pfdGet(){if(!pfdEditableDiagram){try{pfdEditableDiagram=JSON.parse(localStorage.getItem('pfd-editable-v7-'+(activeProject?.id||'default')))||pfdDefaultDiagram()}catch(e){pfdEditableDiagram=pfdDefaultDiagram()}}pfdEditableDiagram.forEach(pfdMetaDefaults);return pfdEditableDiagram}
function pfdSave(){try{localStorage.setItem('pfd-editable-v7-'+(activeProject?.id||'default'),JSON.stringify(pfdGet()))}catch(e){}}
function pfdShape(n){
 const x=n.x,y=n.y,w=n.w,h=n.h,cx=x+w/2,cy=y+h/2,sw=2;
 const palettes={pump:{stroke:'#2563eb',fill:'#eff6ff',accent:'#3b82f6'},tank:{stroke:'#0f766e',fill:'#ecfdf5',accent:'#14b8a6'},filter:{stroke:'#0891b2',fill:'#ecfeff',accent:'#06b6d4'},heat:{stroke:'#c2410c',fill:'#fff7ed',accent:'#f97316'},pasteurizer:{stroke:'#b91c1c',fill:'#fff1f2',accent:'#ef4444'},homogenizer:{stroke:'#7c3aed',fill:'#f5f3ff',accent:'#8b5cf6'},separator:{stroke:'#a16207',fill:'#fefce8',accent:'#eab308'},valve:{stroke:'#d97706',fill:'#fff7ed',accent:'#f59e0b'},instrument:{stroke:'#6d28d9',fill:'#f5f3ff',accent:'#8b5cf6'},diamond:{stroke:'#475569',fill:'#f1f5f9',accent:'#64748b'},packager:{stroke:'#0f766e',fill:'#ecfdf5',accent:'#10b981'},source:{stroke:'#111827',fill:'#f8fafc',accent:'#111827'},product:{stroke:'#16a34a',fill:'#f0fdf4',accent:'#16a34a'},rect:{stroke:'#64748b',fill:'#f8fafc',accent:'#64748b'}};
 const p=palettes[n.type]||palettes.rect,stroke=n.color||p.stroke,fill=n.fillColor||p.fill,accent=n.accentColor||n.color||p.accent;let s='';
 if(n.type==='pump')s=`<circle cx="${cx}" cy="${cy}" r="${Math.min(w,h)*.36}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><path d="M${cx-w*.1} ${cy+h*.17} Q${cx+w*.2} ${cy+h*.08} ${cx+w*.04} ${cy-h*.18} Q${cx-w*.1} ${cy-h*.08} ${cx-w*.1} ${cy+h*.17}Z" fill="${accent}" stroke="${stroke}" stroke-width="1.5"/>`;
 else if(n.type==='tank')s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><path d="M${x} ${y+h*.25}H${x+w} M${cx} ${y-8}V${y} M${cx} ${y+h}V${y+h+8}" stroke="${stroke}" stroke-width="1.5"/>`;
 else if(n.type==='filter')s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><circle cx="${cx}" cy="${cy}" r="${h*.25}" fill="none" stroke="${accent}" stroke-width="1.5"/>`;
 else if(n.type==='heat')s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><path d="M${x+6} ${y+6}L${x+w-6} ${y+h-6} M${x+6} ${y+h-6}L${x+w-6} ${y+6}" stroke="${accent}" stroke-width="${sw}"/>`;
 else if(n.type==='pasteurizer')s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><path d="M${x+w*.25} ${y+5}V${y+h-5} M${x+w*.5} ${y+5}V${y+h-5} M${x+w*.75} ${y+5}V${y+h-5}" stroke="${accent}" stroke-width="2.5"/>`;
 else if(n.type==='homogenizer')s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><circle cx="${x+w*.28}" cy="${cy}" r="${h*.22}" fill="none" stroke="${accent}" stroke-width="2"/><circle cx="${x+w*.72}" cy="${cy}" r="${h*.22}" fill="none" stroke="${accent}" stroke-width="2"/><path d="M${x+w*.38} ${cy}H${x+w*.62} M${x+w*.55} ${cy-5}L${x+w*.62} ${cy}L${x+w*.55} ${cy+5}" stroke="${stroke}"/>`;
 else if(n.type==='separator')s=`<path d="M${x+w*.2} ${y}H${x+w*.8}V${y+h*.78}Q${cx} ${y+h} ${x+w*.2} ${y+h*.78}Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><path d="M${cx} ${y-8}V${y} M${x+w*.3} ${y+h*.25}Q${cx} ${y+h*.18} ${x+w*.7} ${y+h*.25}" fill="none" stroke="${accent}" stroke-width="2"/>`;
 else if(n.type==='valve')s=`<path d="M${x} ${y}L${cx} ${cy}L${x} ${y+h}Z M${x+w} ${y}L${cx} ${cy}L${x+w} ${y+h}Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><path d="M${cx} ${y-6}V${y} M${cx-7} ${y-6}H${cx+7}" stroke="${accent}" stroke-width="1.5"/>`;
 else if(n.type==='instrument')s=`<circle cx="${cx}" cy="${cy}" r="${Math.min(w,h)*.45}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><text x="${cx}" y="${cy+4}" font-size="11" text-anchor="middle" font-weight="700" fill="${stroke}">${pfdEsc(n.tag||'TC')}</text>`;
 else if(n.type==='diamond')s=`<path d="M${cx} ${y}L${x+w} ${cy}L${cx} ${y+h}L${x} ${cy}Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><text x="${cx}" y="${cy+4}" font-size="12" text-anchor="middle" font-weight="700" fill="${stroke}">${pfdEsc(n.label)}</text>`;
 else if(n.type==='packager')s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/><circle cx="${x+w*.18}" cy="${cy}" r="${h*.27}" fill="none" stroke="${accent}" stroke-width="2"/><circle cx="${x+w*.82}" cy="${cy}" r="${h*.27}" fill="none" stroke="${accent}" stroke-width="2"/><path d="M${x+w*.33} ${cy}H${x+w*.67}M${x+w*.62} ${cy-5}L${x+w*.67} ${cy}L${x+w*.62} ${cy+5}" stroke="${stroke}"/>`;
 else if(n.type==='source'||n.type==='product')s=`<circle cx="${cx}" cy="${cy}" r="10" fill="${n.type==='source'?'#111827':'#fff'}" stroke="${stroke}" stroke-width="1.5"/><circle cx="${cx}" cy="${cy+23}" r="10" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
 else if(n.type==='text')return `<g class="pfd-node" data-node="${n.id}" transform="translate(${x},${y})"><text x="0" y="18" font-size="18" font-weight="700" fill="#334155">${pfdEsc(n.label)}</text></g>`;
 else s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
 const labelY=y+h+17,label=n.type==='diamond'?'':n.label;
 return `<g class="pfd-node ${pfdSelectedNode===n.id?'pfd-selected':''}" data-node="${n.id}" tabindex="0"><g>${s}</g><text class="pfd-node-label" x="${cx}" y="${labelY}" text-anchor="middle" fill="${stroke}">${pfdEsc(label)}</text></g>`;
}
function pfdRender(){
 const svg=document.getElementById('pfdDrawing');if(!svg)return;const nodes=pfdGet(),byId=id=>nodes.find(n=>n.id===id);
 const edge=(a,b,dir='h')=>{const A=byId(a),B=byId(b);if(!A||!B)return '';const acx=A.x+A.w/2,acy=A.y+A.h/2,bcx=B.x+B.w/2,bcy=B.y+B.h/2;let d,x2,y2,orient;
 if(dir==='v'){const sy=acy+(bcy>=acy?A.h/2:-A.h/2),ey=bcy+(bcy>=acy?-B.h/2:B.h/2);d=`M${acx} ${sy}V${ey}`;x2=acx;y2=ey;orient=bcy>=acy?'down':'up'}
 else if(dir==='elbow'){const sx=acx+(bcx>=acx?A.w/2:-A.w/2),ex=bcx+(bcx>=acx?-B.w/2:B.w/2),mid=(sx+ex)/2;d=`M${sx} ${acy}H${mid}V${bcy}H${ex}`;x2=ex;y2=bcy;orient=bcx>=acx?'right':'left'}
 else {const sx=acx+(bcx>=acx?A.w/2:-A.w/2),ex=bcx+(bcx>=acx?-B.w/2:B.w/2);d=`M${sx} ${acy}H${ex}`;x2=ex;y2=acy;orient=bcx>=acx?'right':'left'}
 let arrow='';const z=7;if(orient==='right')arrow=`M${x2} ${y2}L${x2-z} ${y2-z/2}L${x2-z} ${y2+z/2}Z`;else if(orient==='left')arrow=`M${x2} ${y2}L${x2+z} ${y2-z/2}L${x2+z} ${y2+z/2}Z`;else if(orient==='down')arrow=`M${x2} ${y2}L${x2-z/2} ${y2-z}L${x2+z/2} ${y2-z}Z`;else arrow=`M${x2} ${y2}L${x2-z/2} ${y2+z}L${x2+z/2} ${y2+z}Z`;
 return `<path d="${d}" class="pfd-pipe"/><path d="${arrow}" class="pfd-arrowhead"/>`};
 const seq=(ids,dir='h')=>ids.slice(0,-1).map((id,i)=>edge(id,ids[i+1],dir)).join('');
 const bands=`<g class=\"pfd-bands\"><rect x=\"20\" y=\"35\" width=\"1780\" height=\"300\" rx=\"12\" fill=\"#f8fbff\" stroke=\"#d9e7f4\"/><rect x=\"20\" y=\"350\" width=\"1780\" height=\"300\" rx=\"12\" fill=\"#fbfcfe\" stroke=\"#dce5ee\"/><rect x=\"20\" y=\"670\" width=\"1780\" height=\"300\" rx=\"12\" fill=\"#f6fbfa\" stroke=\"#d8eae6\"/><rect x=\"20\" y=\"985\" width=\"1780\" height=\"270\" rx=\"12\" fill=\"#fbfaff\" stroke=\"#e0dff0\"/></g>`;
 const pipes=`<g>${edge('raw','v101','elbow')}${seq(['v101','num1','p101','tk101','vc101','f101','v102','num2','p102','v103','he101','vc102','num3','d101','v111','num11','tk103'])}
 ${edge('d101','vc103','elbow')}${seq(['vc103','num4','p103','vc104'],'v')}${edge('vc104','tk102','elbow')}
 ${seq(['tk102','p104','v104','num5','p105','vc105','num6','he103','he102','vc106','he104','v106','p105b','num7'],'h')}
 ${edge('num7','vc107','v')}${seq(['vc107','hr101','v107','num8','p107','fa101','vc108','num9','v108','p108','he105','vc109','p109','v110','num10','pack1','cream'],'h')}
 ${edge('tk103','vc110','elbow')}${seq(['vc110','num12a','p110','vc111','he106','v112','p111','num12b','vc112'],'v')}
 ${seq(['vc112','v113','num13','vc113','he107','v114','p112','hr102','v115','p113','he108','vc116','p114','v116','pack2','pasteurized'],'h')}
 </g>`;
 const controlPairs=[['lc101','tk101'],['tc101','he101'],['lir102','d101'],['lc104','tk103'],['lc102','tk102'],['tcr101','he103'],['tcr102','he104'],['tcr103','hr101'],['fcr101','fa101'],['tcr104','he105'],['tcr105','he106'],['tcr106','he107'],['tcr107','hr102'],['tcr108','he108']];const controls='<g class="pfd-control-lines">'+controlPairs.map(([i,e])=>{const I=byId(i),E=byId(e);if(!I||!E)return '';const ix=I.x+I.w/2,iy=I.y+I.h,ex=E.x+E.w/2,ey=E.y,mid=iy+12;return `<path d="M${ix} ${iy}V${mid}H${ex}V${ey}"/>`}).join('')+'</g>';
 const stageNodes=nodes.filter(n=>n.type==='text').map(pfdShape).join('');
 svg.setAttribute('viewBox','0 0 1840 1300');svg.style.width=(1840*pfdScale)+'px';
 svg.innerHTML=`<style>.pfd-pipe{fill:none;stroke:#64748b;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.pfd-arrowhead{fill:#64748b;stroke:none}.pfd-control-lines path{fill:none;stroke:#94a3b8;stroke-width:1.4;stroke-dasharray:5 5}.pfd-node-label{font:12px Arial,sans-serif;font-weight:650;fill:#334155}.pfd-node text{paint-order:stroke;stroke:#fff;stroke-width:2px;stroke-linejoin:round}</style><defs></defs><rect width="1840" height="1250" fill="#fff"/>${bands}${pipes}${controls}${nodes.filter(n=>n.type!=='text').map(pfdShape).join('')}${stageNodes}`;
 svg.querySelectorAll('.pfd-node').forEach(g=>{g.addEventListener('pointerdown',pfdStartDrag);g.addEventListener('click',e=>{e.stopPropagation();pfdSelectedNode=g.dataset.node;pfdRender();pfdShowDetail()});g.addEventListener('dblclick',e=>{e.stopPropagation();pfdEditLabel(g.dataset.node)})});
 svg.addEventListener('click',()=>{pfdSelectedNode=null;pfdRender();pfdShowDetail()});
}
function pfdStartDrag(e){if(e.button!==0)return;const id=e.currentTarget.dataset.node;pfdSelectedNode=id;const svg=document.getElementById('pfdDrawing'),pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const m=svg.getScreenCTM().inverse(),p=pt.matrixTransform(m),n=pfdGet().find(x=>x.id===id);pfdDrag={id,dx:p.x-n.x,dy:p.y-n.y};e.currentTarget.setPointerCapture?.(e.pointerId);document.addEventListener('pointermove',pfdMoveDrag);document.addEventListener('pointerup',pfdStopDrag,{once:true});pfdRender();pfdShowDetail()}
function pfdMoveDrag(e){if(!pfdDrag)return;const svg=document.getElementById('pfdDrawing'),pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const p=pt.matrixTransform(svg.getScreenCTM().inverse()),n=pfdGet().find(x=>x.id===pfdDrag.id);n.x=p.x-pfdDrag.dx;n.y=p.y-pfdDrag.dy;pfdRender()}
function pfdStopDrag(){document.removeEventListener('pointermove',pfdMoveDrag);pfdDrag=null;pfdSave()}
function pfdMetaDefaults(n){
 const familyMap={pump:'Bombas y transporte',tank:'Tanques y almacenamiento',filter:'Filtración / clarificación',heat:'Intercambio de calor',pasteurizer:'Pasteurización HTST',homogenizer:'Homogeneización',separator:'Separación',valve:'Válvulas',instrument:'Instrumentación y control',diamond:'Corrientes / identificación',packager:'Envasado',source:'Entrada de proceso',product:'Producto final',text:'Texto / etapa',rect:'Sin clasificar / proceso'};
 const descMap={pump:'Equipo para impulsar o recircular leche/producto.',tank:'Recipiente para almacenamiento, balance o retención de producto.',filter:'Equipo para retener partículas y clarificar el producto.',heat:'Equipo de transferencia de calor entre corrientes.',pasteurizer:'Equipo de tratamiento térmico de pasteurización.',homogenizer:'Equipo para reducir y uniformar el tamaño de glóbulos de grasa.',separator:'Equipo para separar fases o componentes del producto.',valve:'Elemento para regular, aislar o dirigir el flujo.',instrument:'Instrumento de medición, indicación o control del proceso.',diamond:'Identificador de corriente del diagrama.',packager:'Equipo o bloque de operación de envasado.',source:'Entrada de materia prima al proceso.',product:'Salida de producto del proceso.',text:'Título o nombre de etapa del diagrama.'};
 if(n.family===undefined)n.family=familyMap[n.type]||'Sin clasificar / proceso';
 if(n.description===undefined)n.description=descMap[n.type]||'Descripción del equipo / operación.';
 if(n.code===undefined)n.code=(n.label||'').match(/[A-Z]{1,3}-?\s?\d{1,3}/)?.[0]||'';
 if(n.shape===undefined)n.shape=n.type;
 if(n.color===undefined)n.color='';
 if(n.parameters===undefined)n.parameters='';
}
function pfdShowDetail(){
 const d=document.getElementById('pfdSymbolDetail');if(!d)return;
 const nodes=pfdGet(),n=nodes.find(x=>x.id===pfdSelectedNode);
 const equipment=nodes.filter(x=>x.type!=='text'&&((x.label||'').match(/^[A-Z]{1,4}-?\s?\d{1,3}/)||x.code));
 const familyOptions=['Sin clasificar / proceso','Bombas y transporte','Tanques y almacenamiento','Filtración / clarificación','Intercambio de calor','Pasteurización HTST','Homogeneización','Separación','Válvulas','Instrumentación y control','Corrientes / identificación','Envasado','Entrada de materia prima','Producto final','Texto / etapa'];
 const shapeOptions=['pump','tank','filter','heat','pasteurizer','homogenizer','separator','valve','instrument','diamond','packager','source','product','rect','text'];
 const nomenclature=equipment.map(x=>{pfdMetaDefaults(x);return `<button class="pfd-nomen-row ${x.id===pfdSelectedNode?'active':''}" onclick="pfdSelectFromNomen('${x.id}')"><span class="pfd-nomen-code">${pfdEsc(x.code||x.label)}</span><span class="pfd-nomen-name">${pfdEsc(x.label)}</span><span class="pfd-nomen-family">${pfdEsc(x.family)}</span></button>`}).join('');
 if(!n){d.innerHTML=`<div class="pfd-panel-title"><h3>Panel de formato</h3><p>Selecciona un elemento para editar su contenido, nomenclatura y estilo.</p></div><div class="pfd-nomen-section"><h4>Nomenclatura vinculada al diagrama</h4><div class="pfd-nomen-table"><div class="pfd-nomen-head"><span>Código</span><span>Bloque / equipo</span><span>Familia</span></div>${nomenclature||'<p class="pfd-empty">No hay equipos codificados.</p>'}</div></div>`;return}
 pfdMetaDefaults(n);
 d.innerHTML=`<div class="pfd-panel-title"><h3>Panel de formato</h3><p>Selecciona un bloque para editar su contenido, estilo y dimensiones.</p></div>
 <div class="pfd-format-fields">
 <label>Texto principal<input id="pfdLabelEdit" value="${pfdEsc(n.label||'')}" oninput="pfdFieldPreview('label',this.value)"></label>
 <label>Descripción / parámetros<textarea id="pfdDescriptionEdit" rows="3" placeholder="Descripción funcional, parámetros de operación...">${pfdEsc(n.description||'')}</textarea></label>
 <label>Familia de equipo<select id="pfdFamilyEdit">${familyOptions.map(v=>`<option ${v===n.family?'selected':''}>${pfdEsc(v)}</option>`).join('')}</select></label>
 <div class="pfd-format-row"><label>Código de equipo<input id="pfdCodeEdit" value="${pfdEsc(n.code||'')}" placeholder="Ej. P-101"></label><span class="pfd-code-chip">${pfdEsc(n.family||'Sin familia')}</span></div>
 <label>Tipo de forma<select id="pfdShapeEdit">${shapeOptions.map(v=>`<option value="${v}" ${v===n.shape?'selected':''}>${v}</option>`).join('')}</select></label>
 <label>Color<input id="pfdColorEdit" type="color" value="${n.color||({pump:'#2563eb',tank:'#0f766e',filter:'#0891b2',heat:'#f97316',pasteurizer:'#ef4444',homogenizer:'#8b5cf6',separator:'#eab308',valve:'#f59e0b',instrument:'#8b5cf6',diamond:'#64748b',packager:'#10b981',source:'#111827',product:'#16a34a',text:'#334155',rect:'#64748b'}[n.type]||'#64748b')}"></label>
 <div class="pfd-format-actions"><button class="btn" onclick="pfdApplyFormat()">Aplicar cambios</button><button class="btn" onclick="pfdDeleteNode()">Eliminar</button></div>
 <p class="pfd-detail-help">Posición X ${Math.round(n.x)} · Y ${Math.round(n.y)} · ${Math.round(n.w)} × ${Math.round(n.h)} px. Arrastra en el lienzo para reubicar.</p></div>
 <div class="pfd-nomen-section"><h4>Nomenclatura vinculada al diagrama</h4><div class="pfd-nomen-table"><div class="pfd-nomen-head"><span>Código</span><span>Bloque / equipo</span><span>Familia</span></div>${nomenclature}</div></div>`;
}
function pfdFieldPreview(key,value){const n=pfdGet().find(x=>x.id===pfdSelectedNode);if(n&&key==='label'){n.label=value;pfdRender()}}
function pfdSelectFromNomen(id){pfdSelectedNode=id;pfdRender();pfdShowDetail()}
function pfdApplyFormat(){const n=pfdGet().find(x=>x.id===pfdSelectedNode);if(!n)return;const label=document.getElementById('pfdLabelEdit')?.value,description=document.getElementById('pfdDescriptionEdit')?.value,family=document.getElementById('pfdFamilyEdit')?.value,code=document.getElementById('pfdCodeEdit')?.value,shape=document.getElementById('pfdShapeEdit')?.value,color=document.getElementById('pfdColorEdit')?.value;if(label!==undefined)n.label=label;if(description!==undefined)n.description=description;if(family!==undefined)n.family=family;if(code!==undefined)n.code=code;if(shape!==undefined){n.shape=shape;n.type=shape;}if(color!==undefined)n.color=color;pfdSave();pfdRender();pfdShowDetail()}
function pfdApplyLabel(){pfdApplyFormat()}
function pfdEditLabel(id){pfdSelectedNode=id;pfdShowDetail();document.getElementById('pfdLabelEdit')?.focus()}
function pfdDeleteNode(){pfdEditableDiagram=pfdGet().filter(n=>n.id!==pfdSelectedNode);pfdSelectedNode=null;pfdSave();pfdRender();pfdShowDetail()}
function pfdInsertSymbol(id){const s=pfdSymbols.find(x=>x.id===id);if(!s)return;const typeMap={'pump':'pump','pump-positive':'pump','bomba-diafragma':'pump','bomba-engranajes':'pump','bomba-piston':'pump','bomba-tornillo':'pump','bomba-dosificadora':'pump','bomba-vacio':'pump','bomba-sumergible':'pump','bomba-vertical':'pump','bomba-peristaltica':'pump','tank':'tank','tank-horizontal':'tank','tanque-abierto':'tank','tanque-conico':'tank','tanque-esferico':'tank','tanque-presion':'tank','recipiente-vertical':'tank','recipiente-horizontal':'tank','heat-shell':'heat','heat-plate':'heat','heater':'heat','cooler':'heat','filter':'filter','separator':'separator','homogenizer':'homogenizer','pasteurizer':'pasteurizer','valve-manual':'valve','valve-control':'valve','valve-check':'valve','instrument-flow':'instrument','instrument-pressure':'instrument','instrument-temp':'instrument','instrument-level':'instrument','instrument-control':'instrument','stream-arrow':'diamond','stream-dashed':'diamond','stream-cross':'diamond','packager':'packager'};const n={id:'new'+Date.now(),type:typeMap[s.id]||'rect',label:s.name,x:750,y:450,w:58,h:54};pfdGet().push(n);pfdSelectedNode=n.id;pfdSave();pfdRender();pfdShowDetail()}
function pfdZoom(v){pfdScale=Math.max(.5,Math.min(2,pfdScale+v));const svg=document.getElementById('pfdDrawing');if(svg)svg.style.width=(1840*pfdScale)+'px';document.getElementById('pfdZoomLabel').textContent=Math.round(pfdScale*100)+'%'}
function pfdFit(){const vp=document.getElementById('pfdViewport');pfdScale=Math.min(1,Math.max(.65,((vp?.clientWidth||1200)-24)/1840));const svg=document.getElementById('pfdDrawing');if(svg)svg.style.width=(1840*pfdScale)+'px';const label=document.getElementById('pfdZoomLabel');if(label)label.textContent=Math.round(pfdScale*100)+'%'}
function pfdReset(){pfdEditableDiagram=pfdDefaultDiagram();pfdSelectedNode=null;pfdSave();pfdRender();pfdShowDetail();pfdFit()}
function initPfdDiagram(){pfdGet();pfdRender();pfdShowDetail();pfdFit()}
function pfdSaveProject(){pfdSave();toast('Diagrama PFD guardado en este navegador');const btn=document.querySelector('.pfd-head-actions button[onclick="pfdSaveProject()"]');if(btn){const old=btn.innerHTML;btn.innerHTML='✓ Guardado';setTimeout(()=>{if(btn.isConnected)btn.innerHTML=old},1200)}}
function pfdExitFullscreen(){const el=document.querySelector('.pfd-library');if(!el)return;if(el.classList.contains('pfd-fullscreen-focus'))pfdToggleFullscreen()}
function pfdToggleFullscreen(){
 const el=document.querySelector('.pfd-library');if(!el)return;
 const active=!el.classList.contains('pfd-fullscreen-focus');
 el.classList.toggle('pfd-fullscreen-focus',active);
 document.body.classList.toggle('pfd-focus-active',active);
 const sidebar=el.querySelector('.pfd-lib-sidebar');
 const head=el.querySelector('.pfd-lib-head');
 const layout=el.querySelector('.pfd-lib-layout');
 const canvas=el.querySelector('.pfd-canvas-area');
 const toolbar=el.querySelector('.pfd-canvas-toolbar');
 const help=el.querySelector('.pfd-editor-help');
 const note=el.querySelector('.pfd-lib-note');
 const detail=el.querySelector('#pfdSymbolDetail');
 const nomen=detail?.querySelector('.pfd-nomen-section');
 if(active){
   // Hide the symbol library and all editor chrome directly, not just via CSS.
   [sidebar,head,help,note].forEach(n=>n?.style.setProperty('display','none','important'));
   if(toolbar){toolbar.style.setProperty('display','flex','important');toolbar.style.setProperty('flex','0 0 42px','important');toolbar.style.setProperty('height','42px','important');toolbar.style.setProperty('justify-content','flex-end','important');toolbar.style.setProperty('z-index','5','important');}
   if(detail){detail.querySelectorAll(':scope > *').forEach(n=>{if(n!==nomen)n.style.setProperty('display','none','important')});detail.style.setProperty('display','flex','important')}
   if(layout){layout.style.setProperty('position','fixed','important');layout.style.setProperty('inset','0','important');layout.style.setProperty('display','grid','important');layout.style.setProperty('grid-template-columns','minmax(0,1fr) 340px','important');layout.style.setProperty('grid-template-rows','minmax(0,1fr)','important');layout.style.setProperty('width','100vw','important');layout.style.setProperty('height','100vh','important');layout.style.setProperty('height','100dvh','important');layout.style.setProperty('overflow','hidden','important')}
   if(canvas){canvas.style.setProperty('grid-column','1','important');canvas.style.setProperty('grid-row','1','important');canvas.style.setProperty('min-width','0','important');canvas.style.setProperty('min-height','0','important');canvas.style.setProperty('height','100%','important');canvas.style.setProperty('overflow','hidden','important')}
   if(detail){detail.style.setProperty('grid-column','2','important');detail.style.setProperty('grid-row','1','important');detail.style.setProperty('width','auto','important');detail.style.setProperty('height','100%','important');detail.style.setProperty('overflow','hidden','important')}
   if(nomen){nomen.style.setProperty('display','flex','important');nomen.style.setProperty('flex-direction','column','important');nomen.style.setProperty('height','100%','important');nomen.style.setProperty('flex','1 1 0','important');nomen.style.setProperty('min-height','0','important');const table=nomen.querySelector('.pfd-nomen-table');if(table){table.style.setProperty('flex','1 1 0','important');table.style.setProperty('height','0','important');table.style.setProperty('max-height','none','important');table.style.setProperty('overflow','auto','important')}}
   document.body.style.setProperty('overflow','hidden','important');
 }else{
   [sidebar,head,toolbar,help,note].forEach(n=>n?.style.removeProperty('display'));
   if(toolbar){['flex','height','justify-content','z-index'].forEach(k=>toolbar.style.removeProperty(k))}
   [layout,canvas,detail].forEach(n=>{if(n){['position','inset','display','grid-template-columns','grid-template-rows','width','height','overflow','grid-column','grid-row','min-width','min-height'].forEach(k=>n.style.removeProperty(k))}});
   if(detail){detail.querySelectorAll(':scope > *').forEach(n=>n.style.removeProperty('display'))}
   if(nomen){['display','flex-direction','height','flex','min-height'].forEach(k=>nomen.style.removeProperty(k));const table=nomen.querySelector('.pfd-nomen-table');if(table)['flex','height','max-height','overflow'].forEach(k=>table.style.removeProperty(k))}
   document.body.style.removeProperty('overflow');
 }
 const btn=el.querySelector('.pfd-head-actions button[onclick="pfdToggleFullscreen()"]');
 if(btn)btn.innerHTML=active?'⤢ Salir pantalla completa':'⛶ Pantalla completa';
 if(active)setTimeout(()=>{pfdFit();const vp=document.getElementById('pfdViewport');if(vp)vp.scrollTop=0;},100);else setTimeout(()=>pfdFit(),100);
}
document.addEventListener('keydown',function(e){if(e.key==='Escape'){const el=document.querySelector('.pfd-library.pfd-fullscreen-focus');if(el)pfdToggleFullscreen()}});

function pfdExportPDF(){
 const svg=document.getElementById('pfdDrawing');
 if(!svg){toast('No se encontró el diagrama para exportar');return}
 const clone=svg.cloneNode(true);
 clone.setAttribute('width','1840');clone.setAttribute('height','1250');clone.style.width='100%';clone.style.height='100%';clone.style.display='block';clone.style.maxWidth='100%';clone.style.maxHeight='100%';clone.style.overflow='visible';
 clone.querySelectorAll('.pfd-selected,[data-selected="true"]').forEach(el=>el.classList.remove('pfd-selected'));
 const title=(activeProject?.name||'Diagrama PFD de pasteurización'),info=activeProject?.info||{},nodes=pfdGet();
 const allRows=nodes.filter(n=>n.code||n.label).map(n=>`<tr><td><strong>${pfdEsc(n.code||'')}</strong></td><td>${pfdEsc(n.label||'')}</td><td>${pfdEsc(n.family||'')}</td></tr>`);
 const table=allRows.length?allRows.join(''):`<tr><td colspan="3" class="empty">No hay elementos con nomenclatura asignada.</td></tr>`;
 const totalEquipment=allRows.length;
 const date=info.date?new Date(info.date+'T12:00:00').toLocaleDateString('es-CO'):'—',members=Array.isArray(info.members)?info.members:String(info.members||'').split(/\r?\n/).filter(Boolean);
 const logo=info.logo?`<img class="project-logo" src="${info.logo}" alt="Logo">`:'<div class="logo-placeholder">PFD</div>';
 const memberCards=members.length?members.map((m,i)=>`<div class="member-card"><span class="member-number">${i+1}.</span><span class="member-name">${pfdEsc(m)}</span></div>`).join(''):'<div class="member-card muted">No se registraron integrantes</div>';
 const win=window.open('','_blank');if(!win){toast('Permite ventanas emergentes para generar el PDF');return}
 win.document.open();win.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${pfdEsc(title)} - PFD</title><style>
 @page{size:A3 landscape;margin:7mm}*{box-sizing:border-box}html,body{margin:0;width:100%;font-family:Arial,sans-serif;color:#172b3a;print-color-adjust:exact;-webkit-print-color-adjust:exact}
 .pdf-page{width:100%;height:283mm;display:flex;flex-direction:column;overflow:hidden;break-after:page;page-break-after:always}.page-content{display:grid;grid-template-columns:48mm minmax(0,1fr);gap:3mm;height:100%;min-height:0;flex:1}
 .project-card{border:1px solid #c5d2dc;border-radius:7px;background:#f8fbfd;padding:3mm;display:flex;flex-direction:column;min-height:0;overflow:hidden}.project-logo{width:28mm;height:28mm;object-fit:contain;align-self:center;margin:0 auto 2mm}.logo-placeholder{width:24mm;height:24mm;border-radius:50%;background:#293e50;color:#fff;font-weight:bold;display:flex;align-items:center;justify-content:center;font-size:16px;align-self:center;margin:0 auto 2mm}.card-kicker{font-size:6.5px;letter-spacing:1.3px;text-transform:uppercase;color:#0087a8;margin:1mm 0}.card-org{font-size:10px;font-weight:700;margin:0 0 1.5mm}.card-meta{font-size:7.5px;color:#526879;line-height:1.3;margin:0 0 2mm;overflow-wrap:anywhere}.card-section{border-top:1px solid #c8d8e4;padding-top:1.5mm;margin-top:1mm}.card-label{font-size:6.3px;letter-spacing:1.1px;text-transform:uppercase;color:#0087a8;margin-bottom:1mm}.card-value{font-size:7.5px;font-weight:600;line-height:1.25;overflow-wrap:anywhere}.member-list{display:flex;flex-direction:column;gap:1.2mm;margin-top:1mm;min-height:0;overflow:hidden}.member-card{border:1px solid #a9d5e3;background:#e5f5fa;border-radius:3mm;padding:1.3mm 1.7mm;font-size:6.6px;line-height:1.2;color:#24485b;display:flex;align-items:flex-start;gap:1mm;overflow-wrap:anywhere}.member-number{flex:0 0 auto;color:#5a70a5;font-weight:700}.member-name{min-width:0}.member-card.muted{color:#7c8b95;background:#f7f9fa;border-color:#d7e0e5}
 .diagram-wrap{position:relative;min-width:0;min-height:0;height:100%;border:1px solid #cbd7df;border-radius:4px;overflow:hidden;padding:2mm;background:#fff;display:flex;flex-direction:column}.diagram-title{flex:0 0 auto;text-align:center;border-bottom:1.5px solid #344e60;padding:1mm 1mm 2mm;margin:0 0 1.5mm}.diagram-title h1{font-size:15px;line-height:1.1;margin:0;font-weight:700}.diagram-title p{font-size:7.5px;color:#526879;margin:1mm 0 0}.drawing{flex:1 1 auto;min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:1mm}.drawing svg{width:100%;height:100%;max-width:100%;max-height:100%;display:block;overflow:visible}
 .nom-page{display:block;width:100%;min-height:0;padding:2mm 1mm 0;background:#fff;color:#172b3a;}.nom-page-head{border-bottom:2px solid #344e60;padding-bottom:4mm;margin-bottom:5mm}.nom-page-head h1{font-size:20px;margin:0 0 2mm}.nom-page-head p{font-size:10px;color:#526879;margin:0}.nom-full{width:100%;border-collapse:collapse;font-size:10px;table-layout:fixed}.nom-full thead{display:table-header-group}.nom-full th,.nom-full td{padding:2.5mm 3mm;border-bottom:1px solid #dfe7ec;text-align:left;vertical-align:top;overflow-wrap:anywhere}.nom-full th{background:#eef3f7;color:#344e60;font-size:9px;text-transform:uppercase;letter-spacing:.4px}.nom-full td:first-child{white-space:nowrap;color:#6548d9;font-weight:bold;width:30mm}.nom-full td:nth-child(2){width:80mm}.nom-full tr{break-inside:avoid;page-break-inside:avoid}.nom-full tbody tr:nth-child(even){background:#f8fafc}.empty{text-align:center;color:#71818d;padding:2mm}.footer{font-size:6px;color:#637482;margin-top:1mm}
 @media print{.pdf-page{height:283mm;break-after:page;page-break-after:always}.nom-page{padding-top:2mm}.nom-full thead{display:table-header-group}.nom-full tr{break-inside:avoid;page-break-inside:avoid}}
 </style></head><body><div class="pdf-page"><main class="page-content"><aside class="project-card">${logo}<div class="card-kicker">Proyecto académico</div><div class="card-org">${pfdEsc(info.organization||'PFD Design')}</div><p class="card-meta">Diagrama de flujo de proceso (PFD) · ${pfdEsc(date)}</p><section class="card-section"><div class="card-label">Responsable / Docente</div><div class="card-value">${pfdEsc(info.reviewer||'—')}</div></section><section class="card-section"><div class="card-label">Integrantes</div><div class="member-list">${memberCards}</div></section></aside><section class="diagram-wrap"><header class="diagram-title"><h1>${pfdEsc(title)}</h1><p>Diagrama de flujo de proceso · Documento exportado</p></header><div class="drawing">${clone.outerHTML}</div></section></main><div class="footer">Documento generado desde PFD Design · ${pfdEsc(title)}</div></div><section class="nom-page"><header class="nom-page-head"><h1>Nomenclatura vinculada al diagrama</h1><p>${pfdEsc(title)} · ${totalEquipment} registros completos de equipos, símbolos e instrumentos</p></header><table class="nom-full"><thead><tr><th>Código</th><th>Equipo / símbolo</th><th>Familia</th></tr></thead><tbody>${table}</tbody></table></section><script>window.onload=()=>setTimeout(()=>window.print(),500);<\/script></body></html>`);
 win.document.close();
}

function renderPfdLibrary(){
 const c=document.getElementById('wsContent');
 c.innerHTML=`<section class="pfd-library pfd-editor"><header class="pfd-lib-head pfd-lib-head-v8"><button class="back-tool" onclick="workspacePage('home')">← Inicio</button><div class="pfd-head-title"><h2>Diagrama PFD</h2><p>Recreación editable del diagrama oficial de pasteurización · Selecciona y arrastra equipos, instrumentos y etiquetas.</p></div><div class="pfd-head-actions"><button class="tool-head-btn" onclick="pfdToggleFullscreen()" title="Pantalla completa">⛶ Pantalla completa</button><button class="tool-head-btn" onclick="pfdExportPDF()">📄 Descargar PDF</button><button class="tool-head-btn" onclick="pfdSaveProject()">💾 Guardar</button></div><div class="pfd-lib-tools"><input id="pfdSymbolSearch" class="pfd-lib-search" placeholder="Buscar equipo o símbolo…" oninput="drawPfdSymbolLibrary()"></div></header><div class="pfd-lib-layout"><aside class="pfd-lib-sidebar"><div class="pfd-lib-sidebar-title">Biblioteca de símbolos</div><nav class="pfd-lib-tabs" id="pfdLibTabs"></nav><div class="pfd-symbol-grid" id="pfdSymbolGrid"></div></aside><main class="pfd-canvas-area pfd-edit-area"><button class="pfd-exit-fullscreen-btn" type="button" onclick="pfdExitFullscreen()" title="Salir de pantalla completa">← Salir de pantalla completa</button><div class="pfd-canvas-toolbar"><span>Diagrama oficial · Vista editable</span><div class="pfd-toolbar-actions"><button onclick="pfdZoom(-.1)">−</button><span id="pfdZoomLabel">100%</span><button onclick="pfdZoom(.1)">＋</button><button onclick="pfdFit()">Ajustar</button><button onclick="pfdReset()">Restaurar</button></div></div><div class="pfd-drawing-viewport" id="pfdViewport"><svg id="pfdDrawing" viewBox="0 0 1840 1250" xmlns="http://www.w3.org/2000/svg"></svg></div><div class="pfd-editor-help">Arrastra cada elemento para reubicarlo · Haz clic para editar su nombre · Usa la biblioteca para insertar nuevos símbolos.</div></main><aside class="pfd-symbol-detail" id="pfdSymbolDetail"></aside></div><div class="pfd-lib-note">Etapa 8 · Acciones del editor: inicio, pantalla completa, PDF y guardar.</section>`;
 drawPfdSymbolLibrary(); initPfdDiagram();
}
function drawPfdSymbolLibrary(){const tabs=document.getElementById('pfdLibTabs'),grid=document.getElementById('pfdSymbolGrid'),detail=document.getElementById('pfdSymbolDetail');if(!tabs||!grid||!detail)return;const cats=['Todos',...new Set(pfdSymbols.map(s=>s.cat))];tabs.innerHTML=cats.map(c=>`<button class="pfd-lib-tab ${pfdActiveCategory===c?'active':''}" onclick="pfdActiveCategory='${c}';drawPfdSymbolLibrary()">${c}${c==='Todos'?' ('+pfdSymbols.length+')':''}</button>`).join('');const q=(document.getElementById('pfdSymbolSearch')?.value||'').toLowerCase();const list=pfdSymbols.filter(s=>(pfdActiveCategory==='Todos'||s.cat===pfdActiveCategory)&&(s.name.toLowerCase().includes(q)||s.desc.toLowerCase().includes(q)||s.cat.toLowerCase().includes(q)));grid.innerHTML=list.map(s=>`<button class="pfd-symbol-card ${s.id===pfdSelectedSymbol?'selected':''}" onclick="pfdSelectedSymbol='${s.id}';drawPfdSymbolLibrary()">${pfdSvg(s)}<span>${s.name}</span></button>`).join('')||'<div class="pfd-lib-empty">No se encontraron símbolos.</div>';const selected=pfdSymbols.find(s=>s.id===pfdSelectedSymbol)||pfdSymbols[0];if(pfdSelectedNode){pfdShowDetail();return;}detail.innerHTML=`<div class="pfd-symbol-preview">${pfdSvg(selected,true)}</div><h3>${selected.name}</h3><p><strong>Categoria:</strong> ${selected.cat}</p><p>${selected.desc}</p><button class="btn" onclick="pfdInsertSymbol('${selected.id}')">＋ Insertar en diagrama</button><div class="pfd-detail-empty" style="margin-top:14px">Selecciona un elemento del diagrama para editarlo.</div>`}

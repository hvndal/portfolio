// Transcribed from Figure 2 of Gong W, et al. "Role of the Gut-Brain Axis in the Shared Genetic Etiology Between
// Gastrointestinal Tract Diseases and Psychiatric Disorders." JAMA Psychiatry 2023;80(4):360-370. doi:10.1001/jamapsychiatry.2022.4974
// Each locus: [cytoband, sign ('+' concordant / '-' discordant), colocalized (shared causal variant), microbe or '', genes]
// Genes: name, with '*' = highlighted in the figure (tissue-specific in gut or brain tissue and other tissues, E-MAGMA).
window.GB = {
  GERD: {
    SCZ: [['1p31.3','+',1,'',['PDE4B']],['1p21.3','-',0,'',['DPYD*']],['2q33.1','+',0,'',[]],['2q37.1','-',0,'',['GIGYF2*','KCNJ13*','NGEF*']],
          ['4q24','+',1,'',[]],['8q12.1','-',0,'',[]],['8q24.3','+',0,'',[]],['10q24.32','+',0,'',['BORCS7*','AS3MT*','CYP17A1*']],
          ['12q24.11','-',0,'',[]],['3p21.31','+',0,'',['CAMKV*','MON1A*','MST1R*']]],
    ADHD: [['7q31.1','+',0,'',['FOXP2*']]],
    BIP: [['3p21.2','+',0,'',['TLR9','ALAS1','WDR82']],['6q16.1','-',0,'',[]],['3p21.31','-',0,'',['RBM6*','CAMKV*','RBM5*']]],
    AN: [['3p13','+',0,'',['FOXP1']],['11q23.2','+',0,'',['NCAM1']],['12q13.2','-',1,'',['SUOX*','RAB5B*','ERBB3*']]],
    PTSD: [['4q24','+',1,'',[]]],
    MDD: [['11q23.2','+',0,'',['NCAM1*']],['2q33.3','+',1,'',['KLF7']]],
  },
  IBD: {
    MDD: [['1p31.3','+',0,'',['SGIP1*']],['1p31.1','+',0,'',['DYNLT5*']],['1q31.3','-',1,'',['DENND1B*','CRB1*']],['1q32.1','+',0,'',['CACNA1S']],
          ['5q33.3','-',1,'',[]],['9p23','+',0,'',[]],['10q21.2','-',0,'',[]]],
    SCZ: [['1q23.3','-',0,'',[]],['1q32.1','+',1,'Bacteroidales',['INAVA*','KIF21B*','CACNA1S']],['4q24','+',0,'',[]],['5q12.1','-',0,'',[]],
          ['7q22.1','+',1,'',['UFSP1*','GIGYF1*','ACHE*']]],
    ADHD: [['19q13.33','-',0,'',['BCL2L12','IRF3*','SCAF1*']]],
    BIP: [['1q32.1','+',0,'',['INAVA*','KIF21B*']],['2q31.3','+',0,'',[]],['8q12.1','+',1,'Barnesiella',['TOX']],['10q21.2','-',1,'',['ZNF365*']],
          ['16p12.2','+',1,'',['PRKCB*']]],
    AN: [['1q32.1','+',0,'',['INAVA*','KIF21B*']],['3p21.31','+',0,'',['IP6K2*','IHO1*','MST1*']]],
    PTSD: [],
  },
  IBS: {
    MDD: [['1q25.1','+',0,'',['COP1']],['5q14.3','+',1,'Sutterella',['TMEM161B*']],['11q23.2','+',1,'',['NCAM1']],['13q14.3','+',0,'',['OLFM4']],
          ['14q21.1','+',0,'',['LRFN5*']],['16p12.2','+',1,'Porphyromonadaceae',[]],['18q21.2','+',0,'',['TCF4*']]],
    SCZ: [['1p32.3','+',1,'Gammaproteobacteria',['LRP8*','CPT2','MAGOH']],['1p21.3','-',0,'',['DPYD*']],['1q23.3','+',1,'Lachnospiraceae',[]],
          ['3q22.3','+',1,'',['PCCB*','STAG1','PPP2R3A*']],['5q33.1','+',0,'',[]],['9q22.31','+',0,'',['FAM120A*','PHF2','FAM120AOS*']],
          ['11q24.2','+',1,'Lachnospiraceae',['VSIG2*','ESAM']],['11q25','-',1,'Alphaproteobacteria',[]],
          ['12q24.31','-',0,'',['PITPNM2*','MPHOSPH9*','ARL6IP4*']],['22q13.2','+',0,'',['RANGAP1*','ZC3H7B*','EP300*']]],
    ADHD: [['5q14.3','-',0,'',['TMEM161B*']],['1p34.2','-',0,'',['HYI','SZT2*']]],
    BIP: [['13q14.3','+',0,'',[]],['11q23.2','+',0,'',['NCAM1']],['10q25.1','-',0,'',['XPNPEP1*']],['8p23.1','-',0,'',['MSRA*']],
          ['7q21.11','+',1,'',['PCLO*']],['4q27','-',0,'',['BLTP1*','IL21','IL2']],['3p12.1','-',0,'',['CADM2*']],['1q23.3','+',1,'',[]],
          ['1p32.3','+',1,'Gammaproteobacteria',['CZIB*','MAGOH','LRP8*']]],
    AN: [['11q23.2','+',0,'',['NCAM1']],['9q22.31','-',0,'',['FAM120AOS*','FAM120A*']]],
    PTSD: [],
  },
  PUD: {
    AN: [['8q24.3','-',0,'',['PSCA*']],['4q31.22','+',0,'Roseburia',['SLC10A7']]],
    BIP: [['11q12.2','+',0,'',['TMEM258*','FADS2*','FADS1*']],['8q24.3','-',0,'',['PSCA*']],['8p23.1','+',0,'',[]],['3p22.2','-',0,'',[]]],
    ADHD: [['19q13.33','-',0,'',['MAMSTR*','FUT2*']],['12q21.33','+',0,'',['DUSP6']],['1p34.1','+',0,'',['ST3GAL3*']]],
    SCZ: [['19q13.33','+',1,'Ruminococcaceae, Bacteroides',['MAMSTR*','RASIP1*','FUT2*']],['11p14.3','+',0,'',[]],['8q24.3','-',0,'',['THEM6*','PSCA*','LY6K*']],
          ['1p21.3','-',0,'',[]]],
    PTSD: [], MDD: [],
  },
};

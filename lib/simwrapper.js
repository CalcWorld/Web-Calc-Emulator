const IM_EY = {}
// import new ClassWiz emulator constants
// ESHardInfomation.h
// ES�̃n�[�h���

///////////////////////////////////////////////////////////////
// ES �֘A�̒�`

// DD �̃h�b�g�}�g���b�N�X�̃T�C�Y�i�V���{���͓����Ă��Ȃ��j
IM_EY.VRAMSIZE_WIDTH = 192
IM_EY.VRAMSIZE_HEIGHT = 63
IM_EY.VRAMSIZE_WIDTHDUMMY = 256

IM_EY.VRAMSIZE_LINE = (IM_EY.VRAMSIZE_WIDTHDUMMY)

// VRAM�̃o�b�t�@�T�C�Y (1dot:1byte)
IM_EY.VRAM_BUF_SIZE = (IM_EY.VRAMSIZE_WIDTHDUMMY*(IM_EY.VRAMSIZE_HEIGHT+1))
// VRAM�̃h�b�g���̊J�n�ʒu
IM_EY.VRAM_DOTSTART_OFFSET = (IM_EY.VRAMSIZE_WIDTHDUMMY)

// DD�̃T�C�Y�i�V���{������, ���m�N��, 1dot:1bit�j
IM_EY.ES_DDLEN = (((IM_EY.VRAMSIZE_WIDTHDUMMY/8)*(IM_EY.VRAMSIZE_HEIGHT+1)))

///////////////////////////////////////////////////////////////
// ES �� GUI �����̂����֘A�̒�`

// �@��W�J����p
IM_EY.REGISTER_MODER = 0x0f050

// �V�~�����[�^�g���p�������T�C�Y�i�V�~�����[�^��p�j�f�t�h���Ƃ̂����p
IM_EY.ES_U8DUMMYSIZE = 0x0100

// Ans Copy �����o�b�t�@�T�C�Y (DispCopy_Std_asm.c ���)
// ����(1), ������(23), Dot(1), E(1), �������܂ގw����(4), �I�[(1) = 31
IM_EY.ANS_COPY_STR_BUFFSIZE = (31)

// RAMMAP.h ���
IM_EY.SADR_DoKeyMode = (0x088E00)							// STOP���[�h�w��Flag(STOPMODE_WAIT~)
IM_EY.SADR_dataKI = (0x088E01)							// �L�[�҂������ۂ�KI�̒l
IM_EY.SADR_dataKO = (0x088E02)							// �L�[�҂������ۂ�KI�̒l
IM_EY.SADR_AnsCopy = (0x088E10)							// AnsCopy����Ans��CBCD�f�[�^�����܂��̈�̃A�h���X
IM_EY.SADR_DispCopy = (0x089000)							// DispCopy����DD�̑S�̈�����܂��̈�̃A�h���X�i�璷�����͂Ȃ��j
// - 4�K�����DD�Ƃ��Ďg�p��
IM_EY.SADR_OTHERTOP = (0x089800)							// OtherData�̐擪�i0x0C �̕����͊܂܂Ȃ��j
IM_EY.SADR_OTHERFLAGHEAD = ((IM_EY.SADR_OTHERTOP + 4))			// FlagData�̃w�b�_�[����
IM_EY.SADR_OTHERFLAGDATA = ((IM_EY.SADR_OTHERFLAGHEAD + 4))		// FlagData�̃f�[�^�擪
IM_EY.SADR_OTHERRESULTHEAD = ((IM_EY.SADR_OTHERFLAGHEAD + 0x30))	// ���ʃf�[�^�w�b�_�[
IM_EY.SADR_OTHERRESULTDATA = ((IM_EY.SADR_OTHERRESULTHEAD + 4))		// ���ʃf�[�^�̃f�[�^�擪
IM_EY.SADR_QRTOP = (0x08A800)

IM_EY.SADR_PWCONT = (0x08B800)							// �UPWCONT(�d�����䃌�W�X�^) (1�o�C�g)
IM_EY.SADR_STACKPTR = (0x08B801)							// �X�^�b�N�|�C���^�̒l (2�o�C�g)

IM_EY.TIME_WAIT = 0.125

// VRAM�̂s�n�o�A�h���X
IM_EY.ES_DDSYMBOLADR = 0xf800
IM_EY.ES_DDTOPADR = 0xf820

// VRAM�A�h���X (4�K������)
IM_EY.ES_DD_LOWER_ADR = (0xf800)
// VRAM�A�h���X (4�K�����)
IM_EY.ES_DD_UPPER_ADR = IM_EY.SADR_DispCopy  // ��DispCopy�̈���g�p

// STOP(KEY)����̉�������r�b�g�̏d��
IM_EY.STOP_KEYRELEASE_BIT = 1
// STOP(��KEY)����̉�������r�b�g�̏d��
IM_EY.STOP_RELEASE_BIT = 5

// ����STOP���������A�h���X
IM_EY.ES_STOPTYPEADR = IM_EY.SADR_DoKeyMode

// �j�h/�j�n�̕ۑ��A�h���X
IM_EY.ES_KIADR = IM_EY.SADR_dataKI
IM_EY.ES_KOADR = IM_EY.SADR_dataKO

// RAM�̃A�h���X�ƒ���
IM_EY.ES_RAM_TOPADR = (0x09000)       // TOP
IM_EY.ES_RAM_USED_ENDADR = (0x0EFFF)       // �g�p����END (C�X�^�b�N��END)
IM_EY.ES_RAM_LEN = (0x6000)         // �S�̂̒���
IM_EY.ES_RAM_USED_LEN = (IM_EY.ES_RAM_USED_ENDADR - IM_EY.ES_RAM_TOPADR + 1) // �g�p���̒���

// �ۑ����郆�[�U�f�[�^�̃A�h���X�ƒ���
IM_EY.ES_USRDATA_TOPADR = (IM_EY.ES_RAM_TOPADR) // TOP
IM_EY.ES_USRDATA_LEN = (0x4000)            // TOP�`VRAM�r���܂� (0xD000 - 0x9000)

// �@�햼�A�o�[�W�����������Ă���ꏊ
IM_EY.ES_NAME_ADR = (0x71FEE)

// �X�^�b�N
IM_EY.ES_STACK_TOP = (0x0E254)
IM_EY.ES_STACK_LEN = (3500)

// ����STOP�����̃f�[�^
IM_EY.ES_STOP_GETKEY = 0x01			// �L�[�҂�
IM_EY.ES_STOP_ACBREAK = 0x02			// AcBreak�`�F�b�N
IM_EY.ES_STOP_DOOFF = 0x03			// OFF
IM_EY.ES_STOP_DDOUT = 0x04			// DD �\��
IM_EY.ES_STOP_QRCODE_IN = 0x05			// QR Ver.11 �J�n�iURL�������Ă���j
IM_EY.ES_STOP_QRCODE_OUT = 0x06			// QR �I��
IM_EY.ES_STOP_QRCODE_IN3 = 0x07			// QR Ver.3  �J�n�iURL�������Ă���j
IM_EY.ES_STOP_ACBREAK2 = 0x08			// AcBreak�`�F�b�N	<SRC_15270_ACBreakWithDD>

IM_EY.ES_QR_DATATOP_ADR = IM_EY.SADR_QRTOP		// QR����URL�������Ă���

// Wait�̎��Ԃ������Ă���A�h���X
IM_EY.ES_WAIT_LADR = 0x0f020
IM_EY.ES_WAIT_UADR = 0x0f021

// ����Mode�����������f�[�^�������Ă���A�h���X
IM_EY.ES_ISMODE_ADR = 0x080fb

// �@�햼�A�o�[�W�����������Ă���ꏊ
IM_EY.ES_NAME_LEN = 6
IM_EY.ES_VERSION_ADR = (IM_EY.ES_NAME_ADR+IM_EY.ES_NAME_LEN)
IM_EY.ES_VERSION_LEN = 2
IM_EY.ES_SUM_ADR = (IM_EY.ES_VERSION_ADR+IM_EY.ES_VERSION_LEN)
IM_EY.ES_SUM_LEN = 2
IM_EY.ES_SUM_STR_LEN = (IM_EY.ES_SUM_LEN*2)		// ������ɂ����ꍇ�̒����isum�̓o�C�i���œ����Ă��邽�߁j

// ���x�`�F�b�N�p�ݒ�
IM_EY.ADR_INPUTADR = (0x0A100)		// �f�[�^�󂯎��p�i256byte�j
IM_EY.ADR_OUTPUTADR = (0x0A200)		// �f�[�^�f���o���p�i256byte
IM_EY.ADR_PCHKWAITADR = (0x09E03)		// ���Z�I���Ď��t���O
IM_EY.ADR_PCHKWAITADR2 = (0x09E04)		// ���Z�I���Ď��t���O

IM_EY.ES_INPUTADR = IM_EY.ADR_INPUTADR		// ���͗p256byte
IM_EY.ES_OUTPUTADR = IM_EY.ADR_OUTPUTADR		// �o�͗p256byte
IM_EY.ES_PCHKWAITADR = IM_EY.ADR_PCHKWAITADR		// ���Z�I���Ď��t���O
IM_EY.ES_PCHKWAITADR2 = IM_EY.ADR_PCHKWAITADR2	// ���Z�I���Ď��t���O�Q

// HE = Hex Editor
IM_EY.HE_FULL_START = 0x0
IM_EY.HE_FULL_END = 0x18ffff + 1
IM_EY.HE_RAM_START = 0x9000
IM_EY.HE_RAM_END = IM_EY.HE_RAM_START + 0x7000
IM_EY.HE_ROM_START = 0x0
IM_EY.HE_ROM_END = 0x07ffff + 1
IM_EY.HE_USER_INPUT_START = IM_EY.HE_RAM_START + 0x8 + 0x26 * 0x10
IM_EY.HE_USER_INPUT_END = IM_EY.HE_USER_INPUT_START + 199 - 1
IM_EY.HE_USER_CACHE_START = IM_EY.HE_USER_INPUT_END + 1 + 1
IM_EY.HE_USER_CACHE_END = IM_EY.HE_USER_CACHE_START + 199 - 1
IM_EY.HE_CURSOR = IM_EY.HE_USER_INPUT_START - 0x83
IM_EY.HE_ROM_INFO = IM_EY.ES_NAME_ADR


// import old ClassWiz emulator constants
const IM_CY = {}
// ESHardInfomation.js
// ES�̃n�[�h��� - ES hard information

///////////////////////////////////////////////////////////////
// ES �֘A�̒�` - ES related definition

// DD �̃h�b�g�}�g���b�N�X�̃T�C�Y�i�V���{���͓����Ă��Ȃ��j- Size of dot matrix (symbols not included)
IM_CY.VRAMSIZE_WIDTH = 192
IM_CY.VRAMSIZE_HEIGHT = 63
IM_CY.VRAMSIZE_WIDTHDUMMY = 256

IM_CY.VRAMSIZE_LINE = (IM_CY.VRAMSIZE_WIDTHDUMMY/8)

// VRAM�̃h�b�g���̊J�n�ʒu - Start position of VRAM dot section
IM_CY.VRAM_DOTSTART_OFFSET = (IM_CY.VRAMSIZE_WIDTHDUMMY/8)

// VRAM�̃T�C�Y�i�V���{�����݁j- VRAM size (Symbol included)
IM_CY.ES_DDLEN = (((IM_CY.VRAMSIZE_WIDTHDUMMY/8)*(IM_CY.VRAMSIZE_HEIGHT+1)))

///////////////////////////////////////////////////////////////
// ES �� GUI �����̂����֘A�̒�` - Definition of interaction related to ES and GUI part

// �@��W�J����p - Judgment of expansion of varieties
IM_CY.REGISTER_MODER = 0x0f050


// �V�~�����[�^�g���p�������T�C�Y�i�V�~�����[�^��p�j�f�t�h���Ƃ̂����p - Memory size for simulator extension (simulator only) For interaction with GUI section
IM_CY.ES_U8DUMMYSIZE = 0x0100

IM_CY.TIME_WAIT = 0.125

// VRAM�̂s�n�o�A�h���X - VRAM TOP address
IM_CY.ES_DDSYMBOLADR = 0xf800
IM_CY.ES_DDTOPADR = 0xf820

// STOP(KEY)����̉�������r�b�g�̏d�� - Bit weight to cancel from stop (key)
IM_CY.STOP_KEYRELEASE_BIT = 1
// STOP(��KEY)����̉�������r�b�g�̏d�� - Bit weight to cancel from STOP (non-KEY)
IM_CY.STOP_RELEASE_BIT = 5

// ����STOP���������A�h���X - What STOP indicated address
IM_CY.ES_STOPTYPEADR = 0x048e00

// �j�h/�j�n�̕ۑ��A�h���X - KI / KO Save Address
IM_CY.ES_KIADR = 0x048e01
IM_CY.ES_KOADR = 0x048e02

// �ۑ����郆�[�U�f�[�^�̃A�h���X�ƒ��� - Address and length of user data to be saved
IM_CY.ES_USRDATA_TOPADR = 0x0D000
IM_CY.ES_USRDATA_LEN = (0x02000)	// �����RAM8K�S�ĕۑ������i�̈悪�@��ɂ���ĕς��炵���̂Łj- This time, all RAM8K saved (area seems to change depending on the model)

// �@�햼�A�o�[�W�����������Ă���ꏊ - Machine name, place where version contains
IM_CY.ES_NAME_ADR = 0x3FFEE


// ����STOP�����̃f�[�^ - What STOP Middle Data
IM_CY.ES_STOP_GETKEY = 0x01			// �L�[�҂� - Waiting for keys
IM_CY.ES_STOP_ACBREAK = 0x02			// AcBreak�`�F�b�N - ACBREAK check
IM_CY.ES_STOP_DOOFF = 0x03			// OFF
IM_CY.ES_STOP_DDOUT = 0x04			// DD �\�� - DD display
IM_CY.ES_STOP_QRCODE_IN = 0x05			// QR Ver.11 �J�n�iURL�������Ă���j- QR Ver.11 start (URL also comes in)
IM_CY.ES_STOP_QRCODE_OUT = 0x06			// QR �I�� - QR end
IM_CY.ES_STOP_QRCODE_IN3 = 0x07			// QR Ver.3  �J�n�iURL�������Ă���j- QR Ver. 3 start (URL comes in)
IM_CY.ES_STOP_ACBREAK2 = 0x08			// AcBreak�`�F�b�N	<SRC_15270_ACBreakWithDD> - ACBREAK check

IM_CY.ES_QR_DATATOP_ADR = 0x04A800			// QR����URL�������Ă��� - The URL at QR is included

// Wait�̎��Ԃ������Ă���A�h���X - Address with WAIT time
IM_CY.ES_WAIT_LADR = 0x0f020
IM_CY.ES_WAIT_UADR = 0x0f021

// ����Mode�����������f�[�^�������Ă���A�h���X - Address contains data indicating whether MODE is currently
IM_CY.ES_ISMODE_ADR = 0x080fb

// �@�햼�A�o�[�W�����������Ă���ꏊ - Machine name, place where version contains
IM_CY.ES_NAME_LEN = 6
IM_CY.ES_VERSION_ADR = (IM_CY.ES_NAME_ADR+IM_CY.ES_NAME_LEN)
IM_CY.ES_VERSION_LEN = 2
IM_CY.ES_SUM_ADR = (IM_CY.ES_VERSION_ADR+IM_CY.ES_VERSION_LEN)
IM_CY.ES_SUM_LEN = 2
IM_CY.ES_SUM_STR_LEN = (IM_CY.ES_SUM_LEN*2)		// ������ɂ����ꍇ�̒����isum�̓o�C�i���œ����Ă��邽�߁j - Length when it is a string (SUM is in binary)

IM_CY.HE_FULL_START = 0x0
IM_CY.HE_FULL_END = 0x08ffff + 1
IM_CY.HE_RAM_START = 0xd000
IM_CY.HE_RAM_END = IM_CY.HE_RAM_START + 0x3000
IM_CY.HE_ROM_START = 0x0
IM_CY.HE_ROM_END = 0x03ffff + 1
IM_CY.HE_USER_INPUT_START = IM_CY.HE_RAM_START + 0x18 * 0x10
IM_CY.HE_USER_INPUT_END = IM_CY.HE_USER_INPUT_START + 199 - 1
IM_CY.HE_USER_CACHE_START = IM_CY.HE_USER_INPUT_END + 1 + 1
IM_CY.HE_USER_CACHE_END = IM_CY.HE_USER_CACHE_START + 199 - 1
IM_CY.HE_CURSOR = IM_CY.HE_USER_INPUT_START - 0x2b
IM_CY.HE_ROM_INFO = IM_CY.ES_NAME_ADR


const IM_ESP = {}
for (const key in IM_CY) {
	IM_ESP[key] = IM_CY[key];
}
IM_ESP.VRAMSIZE_WIDTH = 96
IM_ESP.VRAMSIZE_HEIGHT = 31
IM_ESP.VRAMSIZE_WIDTHDUMMY = 128
IM_ESP.VRAMSIZE_LINE = (IM_ESP.VRAMSIZE_WIDTHDUMMY/8)
IM_ESP.VRAM_DOTSTART_OFFSET = (IM_ESP.VRAMSIZE_WIDTHDUMMY/8)
IM_ESP.ES_DDLEN = (((IM_ESP.VRAMSIZE_WIDTHDUMMY/8)*(IM_ESP.VRAMSIZE_HEIGHT+1)))

IM_ESP.ES_STOPTYPEADR = 0x08e00
IM_ESP.ES_KIADR = 0x08e01
IM_ESP.ES_KOADR = 0x08e02
IM_ESP.ES_NAME_ADR = 0x1FFF4
IM_ESP.ES_VERSION_ADR = (IM_ESP.ES_NAME_ADR+IM_ESP.ES_NAME_LEN)
IM_ESP.ES_SUM_ADR = (IM_ESP.ES_VERSION_ADR+IM_ESP.ES_VERSION_LEN)

IM_ESP.ES_USRDATA_TOPADR = 0x08000
IM_ESP.ES_USRDATA_LEN = 0x02000

IM_ESP.HE_FULL_START = 0x0
IM_ESP.HE_FULL_END = 0x08ffff + 1
IM_ESP.HE_RAM_START = 0x8000
IM_ESP.HE_RAM_END = IM_ESP.HE_RAM_START + 0x3000
IM_ESP.HE_ROM_START = 0x0
IM_ESP.HE_ROM_END = 0x02ffff + 1
IM_ESP.HE_USER_INPUT_START = IM_ESP.HE_RAM_START + 0x154
IM_ESP.HE_USER_INPUT_END = IM_ESP.HE_USER_INPUT_START + 99 - 1
IM_ESP.HE_USER_CACHE_START = IM_ESP.HE_USER_INPUT_END + 1 + 1
IM_ESP.HE_USER_CACHE_END = IM_ESP.HE_USER_CACHE_START + 99 - 1
IM_ESP.HE_CURSOR = IM_ESP.HE_USER_INPUT_START - 0x44
IM_ESP.HE_ROM_INFO = IM_ESP.ES_NAME_ADR


const IM_ES = {}
for (const key in IM_ESP) {
	IM_ES[key] = IM_ESP[key];
}
IM_ES.ES_NAME_ADR = null

IM_ES.HE_FULL_START = 0x0
IM_ES.HE_FULL_END = 0x08ffff + 1
IM_ES.HE_RAM_START = 0x8000
IM_ES.HE_RAM_END = IM_ES.HE_RAM_START + 0x3000
IM_ES.HE_ROM_START = 0x0
IM_ES.HE_ROM_END = 0x02ffff + 1
IM_ES.HE_USER_INPUT_START = IM_ES.HE_RAM_START + 0x140
IM_ES.HE_USER_INPUT_END = IM_ES.HE_USER_INPUT_START + 99 - 1
IM_ES.HE_USER_CACHE_START = IM_ES.HE_USER_INPUT_END + 1 + 1
IM_ES.HE_USER_CACHE_END = IM_ES.HE_USER_CACHE_START + 99 - 1
IM_ES.HE_CURSOR = IM_ES.HE_USER_INPUT_START - 0x34
IM_ES.HE_ROM_INFO = IM_ES.ES_NAME_ADR


const IM_FC = {}
for (const key in IM_ES) {
	IM_FC[key] = IM_ES[key];
}

// TODO
const IM_SOLAR = {}


/*============================================================================
	U8�R�A�̃��W�X�^�V���{����`
	File: RegisterSymbol.h
	Version: 1.12
	Date: 2006.04.27
	Copyright (C) 2005 Oki Electric Industry Co., Ltd.
    All rights reserved.
============================================================================ 
���C����
	v1.00	2005/03/02	SimU8 ���Ń����[�X
	v1.12	2006/04/27	DTU8/SimU8 �\�[�X��{��
============================================================================ */

const REG = {
	R0: 0,
	R1: 1,
	R2: 2,
	R3: 3,
	R4: 4,
	R5: 5,
	R6: 6,
	R7: 7,
	R8: 8,
	R9: 9,
	R10: 10,
	R11: 11,
	R12: 12,
	R13: 13,
	R14: 14,
	R15: 15,
	PC: 16,
	LR: 17,
	ELR1: 18,
	ELR2: 19,
	ELR3: 20,
	CSR: 21,
	LCSR: 22,
	ECSR1: 23,
	ECSR2: 24,
	ECSR3: 25,
	PSW: 26,
	EPSW1: 27,
	EPSW2: 28,
	EPSW3: 29,
	SP: 30,
	EA: 31,
	C: 32,
	Z: 33,
	S: 34,
	OV: 35,
	MIE: 36,
	HC: 37,
	ELEVEL: 38,
	PSWEND: 39,
	
	// SFR
	STPACP: 0xF008,
	SBYCON: 0xF009,
	IE0: 0xF010,
	IE1: 0xF011,
	IRQ0: 0xF014,
	IRQ1: 0xF015,
}
	
/* end of RegisterSymbol.h */	

var _verbose = false
var CLASSPAD = true

if (_verbose) {
	console.log("SimWrapper: Import simlib.js");	
}

const MODEL_TYPE_CLASSWIZ_NEW = "EY";											// new ClassWiz models
const MODEL_TYPE_CLASSWIZ_OLD = "CY";											// old ClassWiz models
const MODEL_TYPE_ES_PLUS = "ESP";												// ES PLUS models
const MODEL_TYPE_ES_PLUS_2 = "ESP2";												// ES PLUS-2 models
const MODEL_TYPE_ES = "ES";														// ES models
const MODEL_TYPE_FC = "FC";														// FC models
const MODEL_TYPE_SOLAR = "SOLAR";												// Solar models

const IM_MAPPING = {}
IM_MAPPING[MODEL_TYPE_CLASSWIZ_NEW] = IM_EY
IM_MAPPING[MODEL_TYPE_CLASSWIZ_OLD] = IM_CY
IM_MAPPING[MODEL_TYPE_ES_PLUS_2] = IM_ESP
IM_MAPPING[MODEL_TYPE_ES_PLUS] = IM_ESP
IM_MAPPING[MODEL_TYPE_ES] = IM_ES
IM_MAPPING[MODEL_TYPE_FC] = IM_FC
IM_MAPPING[MODEL_TYPE_SOLAR] = IM_SOLAR

const IM_QRADDRESS_BUFF = 4096;

// key codes (Note: may need to import these based on model)
// On
const IM_KIKO_ON_KI = 0x00;
const IM_KIKO_ON_KO = 0x00;
// AC
const IM_KIKO_AC_KI = 0x04;
const IM_KIKO_AC_KO = 0x10;
// OPTN
const IM_KIKO_OPTN_KI = 0x40;
const IM_KIKO_OPTN_KO = 0x01;

// interrupt table
const _intr_tbl = [
//  [vector_adrs, ie_adrs, ie_bit, irq_adrs, irq_bit, intname]
	[ 0x0008, 0x0000, 0, 0xf014, 0, "WDTINT" 	],
	[ 0x000a, 0xf010, 1, 0xf014, 1, "XI0INT"	],
 	[ 0x000c, 0xf010, 2, 0xf014, 2, "XI1INT"	],
	[ 0x000e, 0xf010, 3, 0xf014, 3, "XI2INT"	],
	[ 0x0010, 0xf010, 4, 0xf014, 4, "XI3INT"	],
	[ 0x0012, 0xf010, 5, 0xf014, 5, "TM0INT"	],
	[ 0x0014, 0xf010, 6, 0xf014, 6, "L256SINT"	],
	[ 0x0016, 0xf010, 7, 0xf014, 7, "L1024SINT" ],
	[ 0x0018, 0xf011, 0, 0xf015, 0, "L4096SINT" ],
	[ 0x001a, 0xf011, 1, 0xf015, 1, "L16384SINT"],
	[ 0x001c, 0xf011, 2, 0xf015, 2, "SIO0INT"	],
	[ 0x001e, 0xf011, 3, 0xf015, 3, "I2C0INT"	],
	[ 0x0020, 0xf011, 4, 0xf015, 4, "I2C1INT"   ],
	[ 0x0022, 0xf011, 5, 0xf015, 5, "BENDINT"   ],
	[ 0x0024, 0xf011, 6, 0xf015, 6, "BLOWINT"   ],
	[ 0x0026, 0xf011, 7, 0xf015, 7, "RTCINT"	],
	[ 0x0028, 0xf012, 0, 0xf016, 0, "AL0INT"	],
	[ 0x002a, 0xf012, 1, 0xf016, 1, "AL1INT"	]
];

const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var _api = null;																// init the simulator API
var IM;																			// init the emulator constants

var Module = {}
Module.onRuntimeInitialized = async _ => {
	if (_verbose) console.log("SimWrapper: Module.onRuntimeInitialized");
	_api = {																	// fill in the API
		Version: Module.cwrap('Version', 'string', []),

		SetCodeMemorySize: Module.cwrap('SetCodeMemorySize', 'number', ['number', 'number']),
		SetDataMemorySize: Module.cwrap('SetDataMemorySize', 'number', ['number', 'number']),
		SetRomWindowSize: Module.cwrap('SetRomWindowSize', 'number', ['number', 'number']),
		SetCodeMemoryDefaultCode: Module.cwrap('SetCodeMemoryDefaultCode', 'number', ['number']),
		SetMemoryModel: Module.cwrap('SetMemoryModel', 'number', ['number']),
		
		SetInterruptTableEntry: Module.cwrap('SetInterruptTableEntry', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'string']),
		SetPeriBCD: Module.cwrap('SetPeriBCD', 'number', ['number']),

		LoadHexFile: Module.cwrap('LoadHexFile', 'number', ['string', 'number', 'number']),

		GetCount: Module.cwrap('GetCount', 'number', []),
		GetSimRun: Module.cwrap('GetSimRun', 'number', []),
		Execute: Module.cwrap('Execute', 'number', []),
		ExecuteMultiple: Module.cwrap('ExecuteMultiple', 'number', ['number']),
		ExecuteWhileRun: Module.cwrap('ExecuteWhileRun', 'number', []),
		CheckInterrupt: Module.cwrap('CheckInterrupt', 'number', []),
		SimReset: Module.cwrap('SimReset', 'number', []),

		ReadCodeMemory: Module.cwrap('ReadCodeMemory', 'number', ['number', 'number', 'number']),
		WriteCodeMemory: Module.cwrap('WriteCodeMemory', 'number', ['number', 'number', 'number']),
		ReadDataMemory: Module.cwrap('ReadDataMemory', 'number', ['number', 'number', 'number']),
		WriteDataMemory: Module.cwrap('WriteDataMemory', 'number', ['number', 'number', 'number']),
		WriteBitDataMemory: Module.cwrap('WriteBitDataMemory', 'number', ['number', 'number', 'number']),

		ReadReg: Module.cwrap('ReadReg', 'number', ['number', 'number']),
		WriteReg: Module.cwrap('WriteReg', 'number', ['number', 'number']),

		LogStart: Module.cwrap('LogStart', 'number', []),
		LogStart2: Module.cwrap('LogStart2', 'number', ['string']),
		LogStop: Module.cwrap('LogStop', 'number', []),
		LogState: Module.cwrap('LogState', 'number', []),

		LoadRAM: Module.cwrap('LoadRAM', 'number', ['string', 'string']),
		SaveRAM: Module.cwrap('SaveRAM', 'string', ['string']),
	};
}

importScripts("./comlink.min.js");
importScripts('./simlib.js?1687185326516')

class SimWrapper {
	constructor() {
		if (_verbose) console.log('SimWrapper: constructor');
		this._vram = undefined;
		this._lowerBuf = undefined;
		this._upperBuf = undefined;
		this._qr = "";															// init QR code
		this._qrVersion = 0;
		this._simRunning = false;												// init simulator state
		this._cpuCounter = 0;
		this._cpuTime = Date.now();
		this._cpsTotal = 0;
		this._cpsCount = 0;
		this._kikoQueue = [];
		this._acBreak = false;
		this._logKeyToKiKo = {};
		this._keyLogMap = undefined;
		this._keyLogFontMap = {};
		this._keyLogTextMap = {};
		this._keyLogBuffer = [];
		this._keyLogEnabled = false;
		this._simulatorRunning = false;
		this._model = undefined;
		this._modelType = "";
		this.IM = undefined;
		this._soloarIndicator = false;
	}
	
	// Init(rom: string, token: string) : number
	async Init(rom, modelType, customRomData, customKeylog, modelPad) {
		var result = 1;
		if (_verbose) console.log(`SimWrapper: Init(${rom})`);
		if (rom.startsWith('EY') && rom.endsWith('S')) {
			IM_EY.ES_STOPTYPEADR += 7
			IM_EY.ES_KIADR += 4
			IM_EY.ES_KOADR += 6
		}

		this._model = rom;
		this._modelType = modelType;
		this.IM = IM = IM_MAPPING[modelType];

		switch (this._modelType) {
			case MODEL_TYPE_CLASSWIZ_NEW:
				this._vram = new Uint8Array(IM.VRAM_BUF_SIZE).fill(0);				// create combined VRAM buffer
				this._lowerBuf = new Uint8Array(IM.ES_DDLEN).fill(0);				// create lower VRAM buffer
				this._upperBuf = new Uint8Array(IM.ES_DDLEN).fill(0);				// create upper VRAM buffer
				break;
			case MODEL_TYPE_CLASSWIZ_OLD:
			case MODEL_TYPE_ES_PLUS:
			case MODEL_TYPE_ES_PLUS_2:
			case MODEL_TYPE_ES:
			case MODEL_TYPE_FC:
			case MODEL_TYPE_SOLAR:
				this._vram = new Uint8Array(IM.ES_DDLEN).fill(0);					// create VRAM buffer
				break;
		}

		let romStatus = false;
		let romData = undefined;
		if (!customRomData) {
			var url = `../data/${rom}/`
			var romurl = url + "core.dat"

			if (_verbose) console.log("SimWrapper: fetch ROM")
			var response = await fetch(romurl);						// load the encrypted ROM (Intel hex format)
			if (_verbose) console.log(`SimWrapper: response.status = ${response.status}`);
			romStatus = response.status == 200;
			if (romStatus) {
				const romBuffer = await response.arrayBuffer();
				romData = new Uint8Array(romBuffer);
			}
		} else {
			romStatus = true;
			romData = customRomData;
		}

		if (romStatus) {											// ROM .loaded
			if (_verbose) console.log("SimWrapper: get ROM data")
			// let romBuffer = await response.arrayBuffer();                    	// get the ROM data
			// let romData = new Uint8Array(romBuffer);							// view as Uint8Array

			let keylogStatus = false;
			let keylogData = undefined;
			if (!customKeylog) {
				const keyLogResponse = await fetch(url + "keylog.json?1691908133975");		// get key log data for this model calculator
			  keylogStatus = keyLogResponse.ok;
				if (keylogStatus) {
					keylogData = await keyLogResponse.json();
				}
			} else {
				keylogStatus = true;
				keylogData = customKeylog;
			}
			if (keylogStatus) {
				this._keyLogMap = keylogData
				// this._keyLogMap = await keyLogResponse.json();				// get as JSON
				for (let key in this._keyLogMap) {							// for each entry
					let keyStr = this._keyLogMap[key][2];					// get the [...] string for this ki:ko pair
					let kiko = key.split(',');								// extract ki and ko
					let ki = parseInt(kiko[0]);
					let ko = parseInt(kiko[1]);
					this._logKeyToKiKo[keyStr] = [ki, ko];					// set mapping
					this._keyLogFontMap[this._keyLogMap[key][1]] = [this._keyLogMap[key][2], this._keyLogMap[key][3], this._keyLogMap[key][4]];
					this._keyLogTextMap[this._keyLogMap[key][2]] = this._keyLogMap[key][1];
				}
			}

			while(!_api)														// wait until the API is available
				await _sleep(100);

			this._SetMemoryModel(1);											// ƒ�?ƒ‚ƒ�?ƒ‚ƒfƒ‹‚ðÝ’è(0:Small(ML610905) / 1:Large(ML610904)) - Memory model set

			switch (this._modelType) {
				case MODEL_TYPE_CLASSWIZ_NEW:
					this._SetCodeMemorySize(0x000000,0x07ffff);
					this._SetDataMemorySize(0x000000,0x18ffff);
					this._SetRomWindowSize( 0x000000,0x008fff);
					this._SetPeriBCD(1);										// enable BCD support
					break;
				case MODEL_TYPE_CLASSWIZ_OLD:
					// ŽÀÛ‚ÌƒR[ƒhƒ�?ƒ‚ƒ�?‚Í[0x000000~3ffff] - Actual code memory
					this._SetCodeMemorySize(0x000000,0x03ffff);					// ƒR[ƒhƒ�?ƒ‚ƒ�?ƒTƒCƒY‚ÌÝ’è	610904 - Code Memory Size Settings 610904
					this._SetDataMemorySize(0x000000,0x08ffff);
					this._SetRomWindowSize(0x000000,0x00cfff);					// ‚q‚n‚lƒEƒBƒ“ƒhƒEƒTƒCƒY‚ÌÝ’è - ROM window size setting
					this._SetPeriBCD(0);										// disable BCD support
					break;
				case MODEL_TYPE_ES_PLUS_2:
				case MODEL_TYPE_ES_PLUS:
				case MODEL_TYPE_ES:
				case MODEL_TYPE_FC:
					this._SetCodeMemorySize(0x000000, 0x02ffff);
					this._SetDataMemorySize(0x000000, 0x08ffff);
					this._SetRomWindowSize(0x000000, 0x007fff);
					this._SetPeriBCD(0);
					break;
				case MODEL_TYPE_SOLAR:
					// TODO
					break;
			}

			this._SetCodeMemoryDefaultCode(0x0000);								// ƒR[ƒhƒ�?ƒ‚ƒ�?‚ÌƒfƒtƒHƒ‹ƒgƒR[ƒh‚ÌÝ’è - Code Memory Default Code Settings

			if (_verbose) console.log("SimWrapper: set interrupts");
			var index = 0;
			for (var intr of _intr_tbl) {
				result = await _api.SetInterruptTableEntry(index, intr[0], intr[1], intr[2], intr[3], intr[4], intr[5]);
				if (_verbose) console.log(`SimWrapper: SetInterruptTableEntry(${index}, 0x${intr[0].toString(16)}, 0x${intr[1].toString(16)}, ${intr[2]}, 0x${intr[3].toString(16)}, ${intr[4]}, ${intr[5]}) => ${result}`);
				++index;
			}

			// ƒVƒ~ƒ…ƒŒ[ƒ^?��?g’£—Ì�?æ‚ðƒ[ƒƒNƒ�?ƒA - Clear the simulator extension area zero
			let pZero = new Uint8Array(IM.ES_U8DUMMYSIZE+4).fill(0);
			this._WriteDataMemory(IM.ES_STOPTYPEADR-1, IM.ES_U8DUMMYSIZE, pZero);

			if (_verbose) console.log("SimWrapper: load ROM data");
			// !! Check for raw/encrypted ROM
			if (romData.length == ((romData.length + 0xFFFF) & ~0xFFFF)) {
				this._WriteCodeMemory(0, romData.length, romData)
			} else {
				this._LoadHexFile(rom, romData)
			}
            if (_verbose) console.log("SimWrapper: ROM data loaded");

			if (_verbose) {
				let sppc = new Uint8Array(4);
				this._ReadCodeMemory(0, 4, sppc);
				console.log(`SimWrapper: SP-PC ${sppc}`);
			}

			let pad = new Uint8Array(1).fill(modelPad);
			if (_verbose) console.log(`SimWrapper: pad = ${pad}`);
			this._WriteDataMemory(IM.REGISTER_MODER, 1, pad);					// Padî•ñ‚Ì‘‚«ž‚�? - Write PAD information

			this.Reset();														// reset the simulator
			this._InitRegisters();												// init simulator registers

			this._simulatorRunning = false;
			this._SimStart();													// start the simulator

			result = 0;															// success
		}

		return result;
	}

	// Version() : string
	Version() {
		var version = "unknown";
		if (_api)
			version = _api.Version();
		return version;
	}

	// RomVersion() : string
	RomVersion() {
		var version = "Unknown";

		if (_api) {
			if (IM.ES_NAME_ADR == null) {
				return version;
			}
			var name = new Uint8Array(IM.ES_NAME_LEN);
			this._ReadCodeMemory(IM.ES_NAME_ADR, IM.ES_NAME_LEN, name);

			var ver = new Uint8Array(IM.ES_VERSION_LEN);
			this._ReadCodeMemory(IM.ES_VERSION_ADR, IM.ES_VERSION_LEN, ver);

			var sum = new Uint8Array(IM.ES_SUM_LEN);
			this._ReadCodeMemory(IM.ES_SUM_ADR, IM.ES_SUM_LEN, sum);

			var decoder = new TextDecoder();
			var nameStr = decoder.decode(name);
			var verStr = decoder.decode(ver);
			var sumStr = (sum[0] * 0x100 + sum[1]).toString(16).toUpperCase().padStart(4, '0');

			version = `${nameStr} ${verStr} (${sumStr})`;
		}
		
		return version;
	}

	// Reset() : void
	Reset() {
		if (_verbose) console.log("SimWrapper: Reset");
		if (_api) {
			let uckiucko = new Uint8Array(1).fill(0);
			this._WriteDataMemory(IM.ES_KIADR, 1, uckiucko);					// clear keycode
			this._WriteDataMemory(IM.ES_KOADR, 1, uckiucko);

			this._vram.fill(0);													// clear VRAM buffer

			switch (this._modelType) {
				case MODEL_TYPE_CLASSWIZ_NEW:
					this._lowerBuf.fill(0);											// clear buffers
					this._upperBuf.fill(0);
					this._WriteDataMemory(IM.ES_DD_LOWER_ADR, IM.ES_DDLEN, this._lowerBuf);	// clear VRAM in the simulator
					this._WriteDataMemory(IM.ES_DD_UPPER_ADR, IM.ES_DDLEN, this._upperBuf);
					break;
				case MODEL_TYPE_CLASSWIZ_OLD:
				case MODEL_TYPE_ES_PLUS:
				case MODEL_TYPE_ES_PLUS_2:
				case MODEL_TYPE_ES:
				case MODEL_TYPE_FC:
				case MODEL_TYPE_SOLAR:
					this._WriteDataMemory(IM.ES_DDSYMBOLADR, IM.ES_DDLEN, this._vram);	// clear VRAM in the simulator
					break;
			}

			_api.SimReset();													// reset simulator
			this._QRClear();													// reset QR code
			this._cpuCounter = 0;
			this._cpuTime = Date.now();
			this._cpsTotal = 0;
			this._cpsCount = 0;
			}
	}

	// SimulatorIsRunning() : boolean
	SimulatorIsRunning() {
		if (_verbose) console.log(`SimWrapper: SimulatorIsRunning = ${this._simulatorRunning}`);
		return this._simulatorRunning;
	}

	// Stop() : void
	Stop() {
		if (_verbose) console.log("SimWrapper: Stop");
		this._SimStop();
	}

	// QR_Reset() : void
	QR_Reset() {
		this.SetKey(IM_KIKO_AC_KI, IM_KIKO_AC_KO);
	}

	// GetVRAM()) : number
	GetVRAM() {
		let result = 1;

		switch (this._modelType) {
			case MODEL_TYPE_CLASSWIZ_NEW:
				result = this._ReadDataMemory(IM.ES_DD_LOWER_ADR, IM.ES_DDLEN, this._lowerBuf);	// copy lower VRAM from simulator
				if (result == 0) {
					result = this._ReadDataMemory(IM.ES_DD_UPPER_ADR, IM.ES_DDLEN, this._upperBuf);	// copy upper VRAM from simulator
					if (result == 0) {
						this._vram.fill(0);											// clear VRAM buffer

						const height = IM.VRAMSIZE_HEIGHT + 1;
						const width_dd = IM.VRAMSIZE_WIDTH / 8;
						const skip_vram = IM.VRAMSIZE_WIDTHDUMMY - IM.VRAMSIZE_WIDTH;
						const skip_dd = (IM.VRAMSIZE_WIDTHDUMMY - IM.VRAMSIZE_WIDTH) / 8;

						let bufIndex = 0;
						let vramIndex = 0;
						for (let y = 0; y < height; ++y) {							// for each row
							for (let x = 0; x < width_dd; ++x) {					// for each column
								let lower = this._lowerBuf[bufIndex];				// get lower byte
								let upper = this._upperBuf[bufIndex++];				// get upper byte
								let mask = 0x80;									// init bit mask
								for (let b = 0; b < 8; ++b) {						// for each bit
									if (lower & mask) {								// lower bit is set
										this._vram[vramIndex] |= 0x1;				// set in VRAM
									}
									if (upper & mask) {								// upper bit is set
										this._vram[vramIndex] |= 0x2;				// set in VRAM
									}
									vramIndex++;									// advance VRAM index
									mask >>= 1;										// shift bit mask
								}
							}
							// skip
							bufIndex += skip_dd;									// skip to next line
							vramIndex += skip_vram;
						}
					}
				}
				break;
			case MODEL_TYPE_CLASSWIZ_OLD:
			case MODEL_TYPE_ES_PLUS:
			case MODEL_TYPE_ES_PLUS_2:
			case MODEL_TYPE_ES:
			case MODEL_TYPE_FC:
				result = this._ReadDataMemory(IM.ES_DDSYMBOLADR, IM.ES_DDLEN, this._vram);	// copy VRAM from simulator
				break;
			case MODEL_TYPE_SOLAR:
				// TODO
				break;
		}
		return result;
	}

	// ReadVRAM(vram: Comlink.proxy(Uint8Array)) : number
	ReadVRAM(vram) {
		vram.set(this._vram);
		return 0;
	}
	
	// VRAM size values
	VRAMLength() {
		switch (this._modelType) {
			case MODEL_TYPE_CLASSWIZ_NEW:
				return IM.VRAM_BUF_SIZE;
			case MODEL_TYPE_CLASSWIZ_OLD:
			case MODEL_TYPE_ES_PLUS:
			case MODEL_TYPE_ES_PLUS_2:
			case MODEL_TYPE_ES:
			case MODEL_TYPE_FC:
			case MODEL_TYPE_SOLAR:
				return IM.ES_DDLEN;
		}
	}

	VRAMLineLength() {
		return IM.VRAMSIZE_LINE;
	}

	VRAMDotStartOffset() {
		return IM.VRAM_DOTSTART_OFFSET;
	}

	VRAMWidth() {
		return IM.VRAMSIZE_WIDTH;
	}

	VRAMHeight() {
		return IM.VRAMSIZE_HEIGHT;
	}

	VRAMWidthTotal() {
		return IM.VRAMSIZE_WIDTHDUMMY;
	}

    // OnKey() : void
    OnKey() {
        this._OnKey();
    }
		
	// SetKey(ki: number, ko: number) : number
	SetKey(ki, ko) {
		if (_verbose) console.log(`Key push [${ki}, ${ko}]`);
        this._kikoQueue.push([ki, ko, Date.now()]);                             // add key pair to queue
		this._KeyLogPush(ki, ko);												// add to key log if enabled
		return 0;
	}

	SetHardwareKey(key) {
		return this.SetLogKey(key, new Uint8Array(2));
	}

	// SetLogKey(key: string, kikoOut: Comlink.proxy(Uint8Array)) : number
	SetLogKey(key, kikoOut) {
		let result = 1;
		let kiko = this._logKeyToKiKo[key];										// get key pair for the log key
		if (kiko === undefined) {												// didn't find a key pair
			if (key === '[ON]')													// check for special keys
				kiko = [IM_KIKO_ON_KI, IM_KIKO_ON_KO];
		}

		if (kiko !== undefined) {												// got the key pair
			result = this.SetKey(kiko[0], kiko[1]);								// add key pair to queue
			kikoOut[0] = kiko[0];												// return key pair to caller
			kikoOut[1] = kiko[1];
		} else {
			if (key.length > 0) {
				console.error(`${key} not found`);
			}
		}

		return result;
	}

	// GetKeyQueueLength() : number
	GetKeyQueueLength() {
		return this._kikoQueue.length;
	}

	GetDisplayImageData(oldImageData, shadow = false) {
		if (!oldImageData || oldImageData.width !== IM.VRAMSIZE_WIDTH || oldImageData.height !== IM.VRAMSIZE_HEIGHT) {
			oldImageData = new ImageData(IM.VRAMSIZE_WIDTH, IM.VRAMSIZE_HEIGHT)
			oldImageData.data.fill(0)
		}

		const transparency = shadow ? 13 : 0
		let result = this.GetVRAM();											// copy VRAM from simulator
		if (result == 0) {
			switch (this._modelType) {
				case MODEL_TYPE_CLASSWIZ_NEW: // new ClassWiz - _vram has 1 pixel per byte
					for (let row = 0; row < IM.VRAMSIZE_HEIGHT; ++row) {			// for each row of the display
						let rowOffset = IM.VRAM_DOTSTART_OFFSET + row * IM.VRAMSIZE_LINE	// offset to start of row in VRAM

						for (let col = 0; col < IM.VRAMSIZE_WIDTH; ++col) {			// for each column of the display
							// get the column 2 bit color value
							const color = this._vram[rowOffset + col] * 85;
							oldImageData.data[(row * IM.VRAMSIZE_WIDTH + col) * 4 + 3] = color > 0 ? color : transparency;
						}
					}
					break;
				case MODEL_TYPE_CLASSWIZ_OLD: // old ClassWiz - _vram has 8 pixels per byte
				case MODEL_TYPE_ES_PLUS:
				case MODEL_TYPE_ES_PLUS_2:
				case MODEL_TYPE_ES:
				case MODEL_TYPE_FC:
					for (let row = 0; row < IM.VRAMSIZE_HEIGHT; ++row) {			// for each row of the display
						let rowOffset = IM.VRAM_DOTSTART_OFFSET + row * IM.VRAMSIZE_LINE	// offset to start of row in VRAM

						for (let col = 0; col < IM.VRAMSIZE_WIDTH / 8; ++col) {		// for each 8 pixel column of the display
							let colValue = this._vram[rowOffset + col];				// get the column pixels
							let colX = col * 8;										// x coord of first column pixel
							for (let pixel = 0; pixel < 8; ++pixel) {				// for each pixel in the column
								let x = colX + pixel;
								let y = row;
								oldImageData.data[(y * IM.VRAMSIZE_WIDTH + x) * 4 + 3] = (colValue & (1 << (7 - pixel))) ? 255 : transparency;
							}
						}
					}
					break;
				case MODEL_TYPE_SOLAR:
					// TODO
					break;
			}
		}	

		return oldImageData
	}

	GetDisplayDotText() {
		let result = this.GetVRAM();
		let text = '';
		if (result == 0) {
			switch (this._modelType) {
				case MODEL_TYPE_CLASSWIZ_NEW:
					for (let row = 0; row < IM.VRAMSIZE_HEIGHT; ++row) {
						let rowOffset = IM.VRAM_DOTSTART_OFFSET + row * IM.VRAMSIZE_LINE
						for (let col = 0; col < IM.VRAMSIZE_WIDTH; ++col) {
							let i = [" ", ".", ":", "#"][this._vram[rowOffset + col]];
							if (i) {
								text += i;
							}
							if (col == IM.VRAMSIZE_WIDTH - 1) {
								text += "\n";
							}
						}
					}
					break;
				case MODEL_TYPE_CLASSWIZ_OLD:
				case MODEL_TYPE_ES_PLUS:
				case MODEL_TYPE_ES_PLUS_2:
				case MODEL_TYPE_ES:
				case MODEL_TYPE_FC:
					for (let row = 0; row < IM.VRAMSIZE_HEIGHT; ++row) {
						let rowOffset = IM.VRAM_DOTSTART_OFFSET + row * IM.VRAMSIZE_LINE
						let count = 0;
						for (let col = 0; col < IM.VRAMSIZE_WIDTH / 8; ++col) {
							let colValue = this._vram[rowOffset + col];
							for (let pixel = 0; pixel < 8; ++pixel) {
								count++;
								if (colValue & (1 << (7 - pixel))) {
									text += "#";
								} else {
									text += " ";
								}
								if (count == IM.VRAMSIZE_WIDTH) {
									text += "\n";
									count = 0;
								}
							}
						}
					}
					break;
				case MODEL_TYPE_SOLAR:
					// TODO
					break;
			}
		}

		return text;
	}

	// GetSymbolState(data: Uint8Array) : string
	GetSymbolState(data) {
		let state;
		let status_bar;

		if (data === undefined) {
			switch (this._modelType) {
				case MODEL_TYPE_CLASSWIZ_NEW:
					data = this._lowerBuf;  // get symbol state from lower VRAM bank (this._vram contains comdined VRAM)
					break;
				case MODEL_TYPE_CLASSWIZ_OLD:
				case MODEL_TYPE_ES_PLUS:
				case MODEL_TYPE_ES_PLUS_2:
				case MODEL_TYPE_ES:
				case MODEL_TYPE_FC:
				case MODEL_TYPE_SOLAR:
					data = this._vram;
					break;
			}
		}

		// https://github.com/gamingwithevets/u8-emu-frontend/blob/b700bba2c31d3e4d9e0ee641a1fb35c758ecc8b8/main.py#L1294
		switch (this._modelType) {
			case MODEL_TYPE_CLASSWIZ_NEW:
				status_bar = [
					data[1] & 1,  // [S]
					data[3] & 1,  // √[]/
					data[4] & 1,  // [D]
					data[5] & 1,  // [R]
					data[6] & 1,  // [G]
					data[7] & 1,  // FIX
					data[8] & 1,  // SCI
					data[0xa] & 1,  // 𝐄
					data[0xb] & 1,  // 𝒊
					data[0xc] & 1,  // ∠
					data[0xd] & 1,  // ⇩
					data[0xe] & 1,  // (✓)
					data[0x10] & 1,  // ◀
					data[0x11] & 1,  // ▼
					data[0x12] & 1,  // ▲
					data[0x13] & 1,  // ▶
					data[0x15] & 1,  // ⏸
					this._soloarIndicator ? 1 : data[0x16] & 1,  // ☼
				];
				break;
			case MODEL_TYPE_CLASSWIZ_OLD:
				status_bar = [
					data[0] & 1,  // [S]
					data[1] & 1,  // [A]
					data[2] & 1,  // M
					data[3] & 1,  // ->[x]
					data[5] & 1,  // √[]/
					data[6] & 1,  // [D]
					data[7] & 1,  // [R]
					data[8] & 1,  // [G]
					data[9] & 1,  // FIX
					data[0xa] & 1,  // SCI
					data[0xb] & 1,  // 𝐄
					data[0xc] & 1,  // 𝒊
					data[0xd] & 1,  // ∠
					data[0xe] & 1,  // ⇩
					data[0x10] & 1,  // ◀
					data[0x11] & 1,  // ▼
					data[0x12] & 1,  // ▲
					data[0x13] & 1,  // ▶
					data[0x15] & 1,  // ⏸
					this._soloarIndicator ? 1 : data[0x16] & 1,  // ☼
				];
				break;
			case MODEL_TYPE_ES_PLUS:
			case MODEL_TYPE_ES_PLUS_2:
			case MODEL_TYPE_ES:
			case MODEL_TYPE_FC:
				status_bar = [
					data[0] & (1 << 4),  // [S]
					data[0] & (1 << 2),  // [A]
					data[1] & (1 << 4),  // M
					data[1] & (1 << 1),  // STO
					data[2] & (1 << 6),  // RCL
					data[3] & (1 << 6),  // STAT
					data[4] & (1 << 7),  // CMPLX
					data[5] & (1 << 6),  // MAT
					data[5] & (1 << 1),  // VCT
					data[7] & (1 << 5),  // [D]
					data[7] & (1 << 1),  // [R]
					data[8] & (1 << 4),  // [G]
					data[8] & (1 << 0),  // FIX
					data[9] & (1 << 5),  // SCI
					data[0xa] & (1 << 6),  // Math
					data[0xa] & (1 << 3),  // ▼
					data[0xb] & (1 << 7),  // ▲
					data[0xb] & (1 << 4),  // Disp
				];
				break;
			case MODEL_TYPE_SOLAR:
				// TODO
				status_bar = [
					data[0x11] & (1 << 6),  // SHIFT
					data[0x11] & (1 << 2),  // MODE
					data[0x12] & (1 << 6),  // STO
					data[0x12] & (1 << 2),  // RCL
					data[0x13] & (1 << 6),  // hyp
					data[0x13] & (1 << 2),  // M
					data[0x14] & (1 << 6),  // K
					data[0x14] & (1 << 2),  // DEG
					data[0x15] & (1 << 6),  // RAD
					data[0x15] & (1 << 2),  // GRA
					data[0x16] & (1 << 4),  // FIX
					data[0x16] & (1 << 2),  // SCI
					data[0x16] & (1 << 0),  // SD
				];
				break;
		}
		status_bar = status_bar.map((v) => v ? 1 : 0);
		state = status_bar.join('');

		return state;
	}

	// GetQRCode() : string
	GetQRCode() {
		return this._qr;
	}

	// LoadRAM(model: string, ram: string) : number
	LoadRAM(model, ram) {
		let result = 1;
		if (_api)
			result = _api.LoadRAM(model, ram);
		this._simulatorRunning = false;
		return result;
	}

	// SaveRAM(model: string) : string
	SaveRAM(model) {
		/**
		 * The `model` seems to be kind of a encryption key for the `ram` data.
		 * It can't be empty, and when `Load` a RAM data that `Save` by a different `model`, it fails.
		 * And it's used to determine the model type to indicate where the memory range is.
		 * That's why it fails when running an old model such as fx-ES(PLUS) series.
		 * */
		let ram = '';
		if (_api)
			ram = _api.SaveRAM(model);
		return ram;
	}

	NewLoadRAM(ram) {
		if (!(ram instanceof Uint8Array)) {
			return;
		}
		this._WriteDataMemory(IM.ES_USRDATA_TOPADR, ram.length, ram)
	}

	NewSaveRAM() {
		const ram = new Uint8Array(IM.ES_USRDATA_LEN);
		this._ReadDataMemory(IM.ES_USRDATA_TOPADR, IM.ES_USRDATA_LEN, ram);
		return ram;
	}

	// KeyLogStart() : void
	KeyLogStart() {
		this._keyLogBuffer = [];												// clear the buffer
		this._keyLogEnabled = true;												// enable the key log
	}

	// KeyLogStop() : void
	KeyLogStop() {
		this._keyLogEnabled = false;											// disable the key log
	}

	// KeyLogBuffer() : []
	KeyLogBuffer() {
		return this._keyLogBuffer;
	}

	async ReadDataMemory(adrs, len) {
		let valOut = new Uint8Array(len);
		this._ReadDataMemory(adrs, len, valOut);
		return valOut;
	}

	async ReadCodeMemory(adrs, len) {
		let valOut = new Uint8Array(len);
		this._ReadCodeMemory(adrs, len, valOut)
		return valOut;
	}

	async WriteDataMemory(adrs, valIn) {
		valIn = new Uint8Array(valIn);
		const len = valIn.length;
		this._WriteDataMemory(adrs, len, valIn)
	}

	async WriteCodeMemory(adrs, valIn) {
		valIn = new Uint8Array(valIn);
		const len = valIn.length;
		this._WriteCodeMemory(adrs, len, valIn)
	}

	async SetSolarIndicator(status) {
		this._soloarIndicator = !!status;
	}

	async SimulateDiag(on) {
		if (on) {
			switch (this._modelType) {
				case MODEL_TYPE_CLASSWIZ_NEW:
				case MODEL_TYPE_SOLAR:
					this._WriteDataMemory(0xf040, 1, new Uint8Array([0xdb]))
					break;
				case MODEL_TYPE_CLASSWIZ_OLD:
				case MODEL_TYPE_ES_PLUS:
				case MODEL_TYPE_ES_PLUS_2:
				case MODEL_TYPE_ES:
				case MODEL_TYPE_FC:
					this._WriteDataMemory(0xf040, 1, new Uint8Array([0x7b]))
					break
			}
		} else {
			this._WriteDataMemory(0xf040, 1, new Uint8Array([0x0]))
		}
	}

	// ***************************
	// **** internal use only ****
	// ***************************

	_DisplayCPS(count) {
		let current = Date.now();
		let elapsed = current - this._cpuTime;
		let elapsedSeconds = elapsed / 1000;
		let cps = Math.floor(count / elapsedSeconds);
		this._cpsTotal += cps;
		++this._cpsCount;
		let cpsAvg = Math.floor(this._cpsTotal / this._cpsCount);
		this._cpuTime = current;
		console.log(`SimWrapper: Execute [${this._cpuCounter}] ${cps} cps (${cpsAvg} avg)`);
	}

	async _Execute() {
		if (_api && this._simRunning) {
			if (_verbose) console.log("SimWrapper: Execute");

			if (_verbose) console.log("SimWrapper: >>>>");
			let res = _api.ExecuteWhileRun();									// run the simulator until it stops
			if (_verbose) console.log("SimWrapper: <<<<");

			let runflag = _api.GetSimRun();										// get run state
			await this._SimStartCallback(runflag);									// process keys etc.

			let count = _api.GetCount();										// get CPU cycle count
			let deltaCount = count - this._cpuCounter;							// cycles since last time we were here
			this._cpuCounter = count;											// update cpu cycle counter

			if (_verbose) this._DisplayCPS(deltaCount);							// display CPS

			setTimeout(() => { this._Execute() }, 5);								// Rinse and repeat
		}
	}

	// SimStartCallback() : void
	//	Reference: U8Control::SimStartCallback()
	async _SimStartCallback(runflag) {
		if (_verbose) console.log(`SimWrapper: SimStartCallback(${runflag})`);

		if (runflag == 1){
			console.log('SimWrapper: STATUS_HALT');				// HALTƒ‚[ƒh‚É‚È‚Á‚½
		} else if (runflag == 2){
			// console.log('SimWrapper: STATUS_STOP');				// STOPƒ‚[ƒh‚É‚È‚Á‚½
			this._simulatorRunning = true;
			let ucData = new Uint8Array(1);
			this._ReadDataMemory(IM.ES_STOPTYPEADR, 1, ucData);
			if (_verbose) console.log(`SimWrapper: StopType = ${ucData[0]}`)
			if (ucData[0] == IM.ES_STOP_GETKEY)
				await this._KeyProcess();
			else if (ucData[0] == IM.ES_STOP_ACBREAK)
				this._AcBreakCheckProcess();
			else if (ucData[0] == IM.ES_STOP_ACBREAK2)		//<SRC_15270_ACBreakWithDD>
				this._AcBreakCheckProcess2();
			else if (ucData[0] == IM.ES_STOP_DOOFF)
				this._OffProcess();
			else if (ucData[0] == IM.ES_STOP_DDOUT)
				this._DDOutProcess();
			else if (ucData[0] == IM.ES_STOP_QRCODE_IN)		// QR Ver.11 �?JŽniURL‚�?“ü‚Á‚�?‚­‚éj
				this._QRIn(11);
			else if (ucData[0] == IM.ES_STOP_QRCODE_IN3)		// QR Ver.3  �?JŽniURL‚�?“ü‚Á‚�?‚­‚éj
				this._QRIn(3);
			else if (ucData[0] == IM.ES_STOP_QRCODE_OUT)		// QR I—¹
				this._QROut();
			else
				this._WaitProcess();
		} else if (runflag == 3){
			console.log('SimWrapper: STATUS_INSTERR');			// ‘¶Ý‚µ‚È‚¢–½—ß‚ÌŽÀs
		} else if (runflag == 4){
			console.log('SimWrapper: STATUS_PCERR');			// PC”Í�?Í�?O
		}
	}

	// InitRegisters() : void
	_InitRegisters() {
		// Initialize registers R0 to R15 with 0
		for (let i = 0; i < 16; ++i) {
			this._WriteReg(i, 0);
		}
	}

	_GetKey() {
		let kikoEntry = null;
        if (this._kikoQueue.length > 0)                                      	// buffer has keys to process
            kikoEntry = this._kikoQueue.shift();                            	// grab the first one off the queue
		return kikoEntry;
	}

	_KeyBuffClear() {
		this._kikoQueue = [];
	}

	_KeyLogPush(ki, ko) {
		// console.log('SimWrapper: _KeyLogPush');
		if (this._keyLogMap !== undefined && this._keyLogEnabled) {				// key log map is available and key log is enabled
			let key = `${ki},${ko}`;											// create key to the key log map
			let keyLogData = this._keyLogMap[key];								// get the key log data for this key
			if (keyLogData !== undefined) {										// got key log data
				this._keyLogBuffer.push(keyLogData);							// add to the key log buffer
				// console.log(`SimWrapper: _KeyLogPush ${key} => ${keyLogData}`);
			}
		}
	}

	_WaitProcess() {
		if (_verbose) console.log('SimWrapper: WaitProcess');
	
		// ƒL[‚ÌƒNƒ�?ƒAi�?ê‰žj
		let kiko = new Uint8Array([0]);
		this._WriteDataMemory(IM.ES_KIADR, 1, kiko);			// ki‚ð‘‚«ž‚�?
		this._WriteDataMemory(IM.ES_KOADR, 1, kiko);			// ko‚ð‘‚«ž‚�?

		this._WriteBitDataMemory(0x0f014, IM.STOP_RELEASE_BIT, 1);	// �?„‚èž‚Ý�?—�?(Timer STOP‚©‚ç‚Ì•œ‹A)
	}

	async _KeyProcess() {
		if (_verbose) console.log('SimWrapper: KeyProcess');

		let kiko = new Uint8Array([0]);
		let ki = 0;
		let ko = 0;
		let CurCounter = 0;
		let bit = IM.STOP_RELEASE_BIT;

		while(CurCounter < 36) {
			let kikoEntry = this._GetKey();										// get next key from queue
			if (kikoEntry) {                                       				// got a key
				ki = kikoEntry[0];
				ko = kikoEntry[1];
				if (_verbose) console.log(`SimWrapper: KeyProcess [${ki}, ${ko}]`);
				CurCounter = 0;
				bit = IM.STOP_KEYRELEASE_BIT;
	
				if (kikoEntry[0] == IM_KIKO_ON_KI && kikoEntry[1] == IM_KIKO_ON_KO)	{	// check for [ON]
					this._OnKey();
					return;
				}

				break;
			}

			await _sleep(15);
			CurCounter++;
		}

		kiko[0] = ki;
		this._WriteDataMemory(IM.ES_KIADR, 1, kiko);							// ki‚ð‘‚«ž‚�?
		kiko[0] = ko;
		this._WriteDataMemory(IM.ES_KOADR, 1, kiko);							// ko‚ð‘‚«ž‚�?		
		this._WriteBitDataMemory(0x0f014, bit, 1);								// �?„‚èž‚Ý�?—�?(Timer STOP‚©‚ç‚Ì•œ‹A)
	}

	_OffProcess() {
		if (_verbose) console.log('SimWrapper: OffProcess');
		this._WriteBitDataMemory(0x0f014, IM.STOP_RELEASE_BIT, 1);	// �?„‚èž‚Ý�?—�?(Timer STOP‚©‚ç‚Ì•œ‹A)
	}
	
	_DDOutProcess() {
		if (_verbose) console.log('SimWrapper: DDOutProcess');
		this.GetVRAM();
		this._WriteBitDataMemory(0x0f014, IM.STOP_RELEASE_BIT, 1);	// �?„‚èž‚Ý�?—�?(Timer STOP‚©‚ç‚Ì•œ‹A)
	}

	_OnKey() {
		this._KeyBuffClear();													// ƒL[ƒoƒbƒtƒ@‚ÌƒNƒ�?ƒA
		this.Reset();
	}

	_AcBreak() {
		let acBreak = false;													// init to no AC break
		let kikoEntry = this._GetKey();											// get next key
		if (kikoEntry) {														// got key
			if (kikoEntry[0] == IM_KIKO_AC_KI && kikoEntry[1] == IM_KIKO_AC_KO)	// check for AC break
				acBreak = true;
		}
		return acBreak;
	}

	_AcBreakChecking(acBreak) {
		this._acBreak = acBreak;
	}

	_AcBreakCheckProcess() {
		if (_verbose) console.log('SimWrapper: AcBreakCheckProcess');
		this._AcBreakCheckProcess_core(true);
	}

	_AcBreakCheckProcess2() {
		if (_verbose) console.log('SimWrapper: AcBreakCheckProcess2');
		this._AcBreakCheckProcess_core(false);
	}

	_AcBreakCheckProcess_core(flag) {
		let ucValue = new Uint8Array([0]);
	
		if(flag) {
			this.GetVRAM();													// copy VRAM from simulator
			this._AcBreakChecking(true);									// AcBreak’�?
		}

		if (this._AcBreak()) {
			this._AcBreakChecking(false);								// AcBreak’�?‰ð�?
			this._KeyBuffClear();										// ƒL[ƒoƒbƒtƒ@ƒNƒ�?ƒA
			ucValue[0] = 1;
		} else {
			ucValue[0] = 0;
		}
			
		this._WriteDataMemory(IM.ES_STOPTYPEADR, 1, ucValue);			// AcBreak‚ð‘‚«ž‚�?
		this._WriteBitDataMemory(0x0f014, IM.STOP_RELEASE_BIT, 1);	// �?„‚èž‚Ý�?—�?(Timer STOP‚©‚ç‚Ì•œ‹A)	
	}

	_QRIn(version) {
		if (_verbose) console.log(`SimWrapper: QRIn(${version})`);

		// •¶Žš—ñ‚Ì’·‚³‚ð“¾‚é
		let qrBuff = new Uint8Array(IM_QRADDRESS_BUFF + 1);
		let qrStr = "";

		let offset = 0;
		while (true)
		{
		 	this._ReadDataMemory(IM.ES_QR_DATATOP_ADR + offset, IM_QRADDRESS_BUFF, qrBuff);	// get the next chunk
			let len = 0;
			for (let c of qrBuff) {												// for each value in the buffer
				if (c === 0) {													// terminating 0
					break;														// done
				} else {
					qrStr += String.fromCharCode(c);							// add to the QR code string
					++len;														// increment length counter
				}
			}
		 	if (len < IM_QRADDRESS_BUFF)										// end of the QR data
		 		break;
			offset += len;
		}

		// ‚p‚q—pƒoƒbƒtƒ@‚Ì€”õ
		if (qrBuff.length > 0)													// valid QR code
		{
			this._qr = qrStr;													// save the QR code string
			this._qrVersion = version;											// save the QR version
		}
	
		this._WriteBitDataMemory(0x0f014, IM.STOP_RELEASE_BIT, 1);	// �?„‚èž‚Ý�?—�?(Timer STOP‚©‚ç‚Ì•œ‹A)

		if (_verbose) console.log(`SimWrapper: QR = ${this._qr}`);
	}

	_QROut() {
		if (_verbose) console.log('SimWrapper: QROut');
		this._QRClear();
		this._WriteBitDataMemory(0x0f014, IM.STOP_RELEASE_BIT, 1);	// �?„‚èž‚Ý�?—�?(Timer STOP‚©‚ç‚Ì•œ‹A)
	}

	// _QRClear() : void
	_QRClear() {
		this._qr = "";															// clear QR code
	}
	
	/**
	 * Generate dataURI raw BMP image
	 * 
	 * https://stackoverflow.com/questions/58163597/generate-image-in-pure-js-without-canvas
	 *
	 * @param width - image width (num of pixels)
	 * @param pixels - 1D array of RGB pixels (pixel = 3 numbers in
	 *                 range 0-255; staring from left bottom corner)
	 * @return dataURI string
	 */
	_genBMPUri(width, pixels) {
		let LE= n=> (n + 2**32).toString(16).match(/\B../g).reverse().join``;
		let wh= LE(width).slice(0,4) + LE(pixels.length/width/3).slice(0,4);
		let size= LE(26+pixels.length);
	
		let head=`424d${size}000000001a0000000C000000${wh}01001800`;
		
		return "data:image/bmp," + [
				...head.match(/../g), 
				...pixels.map(x=> x.toString(16).padStart(2,'0'))
			].map(x=>'%'+x).join``;
	}
  
	// *******************
	// **** SimU8 API ****
	// *******************

	// SetCodeMemorySize(startadrs: number, endadrs: number) : number
	_SetCodeMemorySize(startadrs, endadrs) {
		var result = 1;
		if (_api)
			result = _api.SetCodeMemorySize(startadrs, endadrs);
		return result;
	}

	// SetDataMemorySize(startadrs: number, endadrs: number) : number
	_SetDataMemorySize(startadrs, endadrs) {
		var result = 1;
		if (_api)
			result = _api.SetDataMemorySize(startadrs, endadrs);
		return result;
	}

	// SetRomWindowSize(startadrs: number, endadrs: number) : number
	_SetRomWindowSize(startadrs, endadrs) {
		var result = 1;
		if (_api)
			result = _api.SetRomWindowSize(startadrs, endadrs);
		return result;
	}

	// SetCodeMemoryDefaultCode(val: number) : number
	_SetCodeMemoryDefaultCode(val) {
		var result = 1;
		if (_api)
			result = _api.SetCodeMemoryDefaultCode(val);
		return result;
	}

	// SetMemoryModel(model: number) : number
	_SetMemoryModel(model) {
		var result = 1;
		if (_api)
			result = _api.SetMemoryModel(model);
		return result;
	}

	// SetInterruptTableEntry(index: number, vector_adrs: number, ie_adrs: number, ie_bit: number, irq_adrs: number, irq_bit: number, intname: string) : number
	_SetInterruptTableEntry(index, vector_adrs, ie_adrs, ie_bit, irq_adrs, irq_bit, intname) {
		var result = 1;
		if (_api)
			result = _api.SetInterruptTableEntry(index, vector_adrs, ie_adrs, ie_bit, irq_adrs, irq_bit, intname);
		return result;
	}

	// SetPeriBCD(enable: number) : number
	_SetPeriBCD(enable) {
		var result = 1;
		if (_api)
			result = _api.SetPeriBCD(enable);
		return result;
	}

	// LoadHexFile(model: string, romData: Uint8Array) : number
	_LoadHexFile(model, romData) {
		var result = 1;
		if (_api) {
            let romPtr = Module._malloc(romData.length * romData.BYTES_PER_ELEMENT);	// allocate shared memory
            Module.HEAPU8.set(romData, romPtr);									// load the ROM data into shared memory
			result = _api.LoadHexFile(model, romPtr, romData.length);			// load into the simulator
			Module._free(romPtr);
		}
		return result;
	}

	// SimReset() : void
	_SimReset() {
		this._SimStop();
		if (_api)
			_api.SimReset();
	}

	// SimStart() : void
	_SimStart() {
		this._simRunning = true;

		let sppc = new Uint8Array(4);
		this._ReadCodeMemory(0, 4, sppc);
		
		let sp = sppc[0] + (sppc[1] * 256);										// get initial stack pointer
		let pc = sppc[2] + (sppc[3] * 256);										// get initial program counter

		this._WriteReg(REG.SP, sp);												// set SP
		this._WriteReg(REG.PC, pc);												// set PC

		this._Execute();														// start the execution loop
	}

	// SimStop() : void
	_SimStop() {
		this._simRunning = false;
	}

	// ReadCodeMemory(adrs: number, len: number, valOut: Comlink.proxy(Uint8Array)) : number
	_ReadCodeMemory(adrs, len, valOut) {
		var result = 1;
		if (_api) {
			var valPtr = Module._malloc(len);									// allocate shared heap memory
			result = _api.ReadCodeMemory(adrs, len, valPtr);
			if (result === 0) {
				var valResult = new Uint8Array(Module.HEAPU8.subarray(valPtr, valPtr + len));	// create a new view of the result
				valOut.set(valResult);											// set it in the output array
			}

			Module._free(valPtr);												// free shared heap memory
		}
		return result;
	}

	// WriteCodeMemory(adrs: number, len: number, valIn: Uint8Array) : number
	_WriteCodeMemory(adrs, len, valIn) {
		var result = 1;
		if (_api && valIn.length >= len) {
			var valPtr = Module._malloc(len);									// allocate shared heap memory
			Module.HEAPU8.set(valIn, valPtr);									// set value in heap
			result = _api.WriteCodeMemory(adrs, len, valPtr);					// write the values to code memory
			Module._free(valPtr);												// free shared heap memory
		}
		return result;
	}

	// ReadDataMemory(adrs: number, len: number, valOut: Comlink.proxy(Uint8Array)) : number
	_ReadDataMemory(adrs, len, valOut) {
		var result = 1;
		if (_api) {
			var valPtr = Module._malloc(len);									// allocate shared heap memory
			result = _api.ReadDataMemory(adrs, len, valPtr);
			if (result === 0) {
				var valResult = new Uint8Array(Module.HEAPU8.subarray(valPtr, valPtr + len));	// create a new view of the result
				valOut.set(valResult);											// set it in the output array
			}

			Module._free(valPtr);												// free shared heap memory
		}
		return result;
	}

	// WriteDataMemory(adrs: number, len: number, valIn: Uint8Array) : number
	_WriteDataMemory(adrs, len, valIn) {
		var result = 1;
		if (_api && valIn.length >= len) {
			var valPtr = Module._malloc(len);									// allocate shared heap memory
			Module.HEAPU8.set(valIn, valPtr);									// set value in heap
			result = _api.WriteDataMemory(adrs, len, valPtr);					// write the values to code memory
			Module._free(valPtr);												// free shared heap memory
		}
		return result;
	}

	// WriteBitDataMemory(adrs: number, n: number, valIn: number) : nunber
	_WriteBitDataMemory(adrs, n, valIn) {
		var result = 1;
		if (_api) {
			result = _api.WriteBitDataMemory(adrs, n, valIn);
		}
		return result;
	}

	
	// ReadReg(regtype: number, valOut: Comlink.proxy(Uint16Array)) : number
	_ReadReg(regType, valOut) {
		var result = 1;
		if (_api) {
			var valPtr = Module._malloc(2);										// allocate shared heap memory
			result = _api.ReadReg(regType, valPtr);
			if (result === 0) {
				var val = Module.HEAPU8[valPtr] + (Module.HEAPU8[valPtr + 1] * 256);
				var valResult = new Uint16Array([val]);							// create a new view of the result
				valOut.set(valResult);											// set the output value
			}

			Module._free(valPtr);												// free shared heap memory
		}
		return result;
	}

	// WriteReg(regtype: number, valIn: number) : number
	_WriteReg(regType, valIn) {
		var result = 1;
		if (_api) {
			result = _api.WriteReg(regType, valIn);
		}
		return result;
	}

	
	// LogStart() : number
	_LogStart() {
		var result = 1;
		if (_api) {
			result = _api.LogStart();
		}
		return result;
	}

	// LogStart2(fname: string) : number
	_LogStart2() {
		var result = 1;
		if (_api) {
			result = _api.LogStart2(fname);
		}
		return result;
	}

	// LogStop() : number
	_LogStop() {
		var result = 1;
		if (_api) {
			result = _api.LogStop();
		}
		return result;
	}

	// LogState() : number
	_LogState() {
		var result = 1;
		if (_api) {
			result = _api.LogState();
		}
		return result;
	}
}

Comlink.expose(SimWrapper);

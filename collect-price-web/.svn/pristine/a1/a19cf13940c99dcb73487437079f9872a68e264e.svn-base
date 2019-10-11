package com.chngc.collect.util;

/**
 * ����:	FileBean.java
 * ����:	�ļ�����ͨ�ú���Ķ����ʵ��
 * ����:	������
 * ��������:	2004.08.06
 * �޸�����:
 */

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.RandomAccessFile;
import java.util.Collection;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.IOFileFilter;

@Slf4j
public class FileBean {
//	private static Logger log = Logger.getLogger(FileBean.class);

	private int size = 0;

	private static String osName = "";

	// 构造函数
	public FileBean() {

	}

	// ==================================================================
	// 文件名称分解的几个工具函数

	// 检查指定文件是否存在
	// 参数：_sPathName 文件名称(含路径）
	// 返回值：若存在，则返回true；否则，返回false
	public static boolean fileExists(String _sPathFileName) {
		File file = new File(formatPath(_sPathFileName));
		return file.exists();
	}

	public static boolean pathExists(String _sPathFileName) {
		String sPath = getFilePath(formatPath(_sPathFileName));
		return fileExists(sPath);
	}

	// 从文件的完整路径名（路径+文件名）中提取文件名(包含扩展名)
	// 如：d:\path\file.ext --> file.ext
	public static String getFileName(String _sFilePathName) {
		int nPos = formatPath(_sFilePathName).lastIndexOf(File.separatorChar);
		return formatPath(_sFilePathName).substring(nPos + 1);
	}

	// 从文件的完整路径名（路径+文件名）中
	// 提取: 文件扩展名
	public static String getFileExt(String _sFilePathName) {
		int nPos = FileBean.formatPath(_sFilePathName).lastIndexOf('.');
		return (nPos >= 0 ? formatPath(_sFilePathName).substring(nPos + 1)
				.toLowerCase() : "");
	}

	// 从文件的完整路径名（路径+文件名）中
	// 提取: 路径（包括：Drive+Directroy)
	public static String getFilePath(String _sFilePathName) {
		int nPos = formatPath(_sFilePathName).lastIndexOf(File.separatorChar);
		return (nPos >= 0 ? formatPath(_sFilePathName).substring(0, nPos + 1)
				: "");
	}

	// 将文件/路径名称转化为绝对路径名
	public static String toAbsolutePathName(String _sFilePathName) {
		File file = new File(formatPath(_sFilePathName));
		return file.getAbsolutePath();
	}

	// 从文件的完整路径名（路径+文件名）中
	// 提取: 文件所在驱动器
	// 注意：区分两种类型的文件名表示
	// [1] d:\path\filename.ext --> return "d:"
	// [2] \\host\shareDrive\shareDir\filename.ext --> return
	// "\\host\shareDrive"
	public static String getFileDrive(String _sFilePathName) {
		int nPos;
		_sFilePathName = formatPath(_sFilePathName);
		int nLen = _sFilePathName.length();

		// 检查是否为 "d:\path\filename.ext" 形式
		if ((nLen > 2) && (_sFilePathName.charAt(1) == ':')) {
			return _sFilePathName.substring(0, 2);
		}

		// 检查是否为 "\\host\shareDrive\shareDir\filename.ext" 形式
		if ((nLen > 2) && (_sFilePathName.charAt(0) == File.separatorChar)
				&& (_sFilePathName.charAt(1) == File.separatorChar)) {
			nPos = _sFilePathName.indexOf(File.separatorChar, 2);
			if (nPos >= 0) {
				nPos = _sFilePathName.indexOf(File.separatorChar, nPos + 1);

			}
			return (nPos >= 0 ? _sFilePathName.substring(0, nPos)
					: _sFilePathName);
		} else {
			return "";
		}
	} // END:getFileDrive

	// 删除指定的文件
	public static boolean deleteFile(String _sFilePathName) {
		File file = new File(formatPath(_sFilePathName));
		return file.delete();
	}

	// =======================================================================
	// 目录操作函数

	// 创建目录
	// 参数：_sDir 目录名称
	// _bCreateParentDir 如果父目录不存在，是否创建父目录
	public static boolean makeDir(String _sDir, boolean _bCreateParentDir) {
		File file = new File(formatPath(_sDir));
		log.debug("makeDir:" + formatPath(_sDir));
		boolean bReturn = false;
		try {
			FileUtils.forceMkdir(file);
			bReturn=true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		log.debug("makeDir Return:" + bReturn);
		return bReturn;
	}

	// 删除指定的目录
	// 参数：_sDir 要删除的目录名
	// _bDeleteChildren 如果目录下存在文件或者子目录，是否删除他们
	// 默认值为false，即不删除目录下的文件或子目录。
	// 注意：若文件或目录正在使用，删除操作将失败。
	public static boolean deleteDir(String _sDir) {
		return deleteDir(_sDir, false);
	}

	public static boolean deleteDir(String _sDir, boolean _bDeleteChildren) {
		File file = new File(formatPath(_sDir));
		log.debug(formatPath(_sDir));
		if (!file.exists()) {
			return false;
		}

		if (_bDeleteChildren) { // 删除子目录及其中文件
			File[] files = file.listFiles(); // 取目录中文件和子目录列表
			for (int i = 0; i < files.length; i++) {
				if (files[i].isDirectory()) {
					deleteDir(files[i].getAbsolutePath(), _bDeleteChildren);
				} else {
					files[i].delete();
				}
			} // end for
		} // end if
		return file.delete(); // 删除该目录
	} // END:deleteDir

	// =======================================================================
	// 文件读写操作函数

	// 读取文件的内容，返回字符串类型的文件内容
	public static String readFile(String _sFileName) throws IOException {
		File file = null;
		FileReader fileReader = null;
		StringBuffer buffContent = null;
		String sLine;

		try {
			file = new File(formatPath(_sFileName));
			fileReader = new FileReader(file);
			BufferedReader buffReader = new BufferedReader(fileReader);

			while ((sLine = buffReader.readLine()) != null) {
				if (buffContent == null) {
					buffContent = new StringBuffer();
				} else {
					buffContent.append("\n");
				}
				buffContent.append(sLine);
			} // end while

			buffReader.close();
			return (buffContent == null ? "" : buffContent.toString());
		} catch (FileNotFoundException e) {
			System.out.println("要读取得文件没有找到:" + e);
			return "";
		} catch (IOException e) {
			System.out.println("读文件时错误:" + e);
			return "";
		}

		finally {
			if (fileReader != null) {
				try {
					fileReader.close();
				} catch (Exception e) {
				}
			}
		} // end try
	} // END: readFile()

	public static String readFile(String _sFileName,String charset) throws IOException {
		File file = null;
		FileReader fileReader = null;
		StringBuffer buffContent = null;
		String sLine;

		try {
			file = new File(formatPath(_sFileName));
			BufferedReader buffReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), charset));

			while ((sLine = buffReader.readLine()) != null) {
				if (buffContent == null) {
					buffContent = new StringBuffer();
				} else {
					buffContent.append("\n");
				}
				buffContent.append(sLine);
			} // end while

			buffReader.close();
			return (buffContent == null ? "" : buffContent.toString());
		} catch (FileNotFoundException e) {
			System.out.println("要读取得文件没有找到:" + e);
			return "";
		} catch (IOException e) {
			System.out.println("读文件时错误:" + e);
			return "";
		}

		finally {
			if (fileReader != null) {
				try {
					fileReader.close();
				} catch (Exception e) {
				}
			}
		} // end try
	} // END: readFile()
	
	// 以指定内容_sFileContent生成新的文件_sFileName
	public static boolean writeFile(String _sFileName, String _sFileContent)
			throws IOException {
		boolean bRet = false;
		try {
			String p = System.getProperty("file.encoding");
			// System.out.println("file.encoding: " +p);
			if (!p.toUpperCase().startsWith("GB")) {
				System.out.println("********ISO-8859-1->GBK*******");
				_sFileContent = new String(_sFileContent.getBytes("GBK"),
						"ISO-8859-1");
			}
			FileOutputStream fos = new FileOutputStream(formatPath(_sFileName));
			PrintWriter pw = new PrintWriter(fos);
			pw.println(_sFileContent);
			bRet = true;
			pw.close();
			fos.close();
		} catch (Exception e) {
			System.out.println("写文件错误:" + e);
		} // end try
		return bRet;
	} // END: writeFile()

	// 把指定的内容_sAddContent追加到文件_sFileName中
	public static boolean appendFile(String _sFileName, String _sAddContent)
			throws IOException {
		boolean bResult = false;
		try {
			RandomAccessFile raf = new RandomAccessFile(formatPath(_sFileName),
					"rw");
			raf.seek(raf.length());
			raf.writeBytes(_sAddContent);
			raf.close();
			bResult = true;
		} catch (Exception e) {
			System.out.println("向文件追加内容时发生异常:" + e);
		} // end try
		return bResult;
	} // END: appendFile()

	// 复制文件
	public static boolean copyFile(String _sSrcFile, String _sDstFile)
			throws IOException {
		boolean bResult = false;
		try {
			FileUtils.copyFile(new File(formatPath(_sSrcFile)), new File(formatPath(_sDstFile)));
			bResult=true;
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		return bResult;
	} // END: copyFile()

	// 复制文件
	public static boolean renanemFile(String _sSrcFile, String _sDstFile)
			throws IOException {
		boolean bResult = false;
		File f = new File(formatPath(_sSrcFile));
		if (!f.exists()) {
			log.info("#--Source File Not Found:" + formatPath(_sSrcFile));
			return false;
		}
		if (f.isDirectory()) {
			log.info("#--Source File is a dir:" + formatPath(_sSrcFile));
			return false;
		}
		try {
			String[] commands = new String[] { "mv", formatPath(_sSrcFile),
					formatPath(_sDstFile) };

			if (osName.equals("")) {
				osName = System.getProperty("os.name").toLowerCase();
				;
			}
			log.debug("osName: " + osName);

			if (osName.startsWith("windows")) {
				if (osName.indexOf("windows 9") > -1) {
					commands = new String[] { "command.com", "/c", "move",
							"\"" + _sSrcFile + "\"", "\"" + _sDstFile + "\"" };
				} else {
					commands = new String[] { "cmd.exe", "/c", "move",
							"\"" + _sSrcFile + "\"", "\"" + _sDstFile + "\"" };
				}
				log.debug("Execing " + commands[0] + " " + commands[1] + " "
						+ commands[2] + " " + commands[3] + " " + commands[4]);
			} else {
				log.debug("Execing " + commands[0] + " " + commands[1] + " "
						+ commands[2]);
			}

			// Execute a command with an argument that contains a space
			Process child = Runtime.getRuntime().exec(commands);

			/*
			 * // any error message? StreamGobbler errorGobbler = new
			 * StreamGobbler(child .getErrorStream(), "ERROR"); // any output?
			 * StreamGobbler outputGobbler = new StreamGobbler(child
			 * .getInputStream(), "OUTPUT"); // kick them off
			 * errorGobbler.start(); outputGobbler.start();
			 */
			// any error?
			int exitVal = child.waitFor();

			if (exitVal == 0) {
				bResult = true;
			} else {
				System.out.println("#----ExitValue: " + exitVal);
			}
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("重命名文件时发生异常:" + e);
			throw e;
		} catch (InterruptedException e) {
			e.printStackTrace();
			System.out.println("重命名文件时发生异常:" + e);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("重命名文件时发生异常:" + e);
		}

		return bResult;
	} // END: renanemFile()

	// 修改Unix/Linux文件或目录权限(递归)
	public static void chmod(String _sFilePath, String _sRWX) {
		try {
			String p = System.getProperty("os.name");
			// System.out.println("os: " +p);
			if (p.toUpperCase().startsWith("WINDOWS")) {
				return;
			}
		} catch (Exception e) {
		}

		File file = new File(_sFilePath);
		if (!file.exists()) {
			System.out.println("file:" + _sFilePath + " not exist!");
			return;
		}
		String cmd = "chmod -Rf " + _sRWX + " " + _sFilePath;
		System.out.println(cmd);
		try {
			Process process = Runtime.getRuntime().exec(cmd);
			process.waitFor();
		} catch (Exception e) {
		}
	}

	// 修改Unix/Linux文件或目录属主(递归)
	public static void chown(String _sFilePath, String _sOwner) {
		try {
			String p = System.getProperty("os.name");
			// System.out.println("os: " +p);
			if (p.toUpperCase().startsWith("WINDOWS")) {
				return;
			}
		} catch (Exception e) {
		}

		File file = new File(_sFilePath);
		if (!file.exists()) {
			System.out.println("file:" + _sFilePath + " not exist!");
			return;
		}
		String cmd = "chown -Rf " + _sOwner + " " + _sFilePath;
		System.out.println(cmd);
		try {
			Process process = Runtime.getRuntime().exec(cmd);
			process.waitFor();
		} catch (Exception e) {
		}
	}

	// xcopy(windows) or cp(Unix/Linux)实现
	// cp /xxtproject/* /xxtproject_back/ //*导致bug!
	// usage:
	/**
	 * windows: FileBean.xcopy("c:\\test\\*", "c:\\dest"); Linux:
	 * FileBean.xcopy("/var/test/", "/var/dest");
	 */
	/*
	 * public static void xcopy(String _src, String _dest) { try { File file =
	 * new File(_dest); if (!file.exists()) { System.out.println("dest:" + _dest + "
	 * not exist!"); return; }
	 * 
	 * String p = System.getProperty("os.name"); //System.out.println("os: "
	 * +p); String cmd = ""; String[] paras = new String[3]; if
	 * (p.toUpperCase().startsWith("WINDOWS")) { cmd = "xcopy /S/Y " + _src + " " +
	 * _dest; } else { cmd = "cp -Rf " + _src + " " + _dest; }
	 * System.out.println(cmd); System.out.println("=======start xcopy=======");
	 * Process process = Runtime.getRuntime().exec(cmd); //Process process =
	 * Runtime.getRuntime().exec(cmd, paras); process.waitFor();
	 * System.out.println("=======end xcopy======="); } catch (Exception e) {
	 * System.out.println(e); } }
	 */

	public static void xcopy(String _src, String _dest) {
		try {
			log.debug(formatPath(_src));
			log.debug(formatPath(_dest));
			File file = new File(formatPath(_dest));
			if (!file.exists()) {
				if (!makeDir(formatPath(_dest), true)) {
					System.out.println("dest:" + formatPath(_dest)
							+ " not exist!");
					return;
				}
			}
			if (!file.isDirectory()) {
				System.out.println("dest:" + formatPath(_dest)
						+ " is not a dir!");
				return;
			}

			file = new File(formatPath(_src));
			if (!file.exists()) {
				System.out.println("src:" + formatPath(_src) + " not exist!");
				return;
			}

			File[] files = file.listFiles(); // 取目录中文件和子目录列表
			String tmpDir, tmpFile;
			for (int i = 0; i < files.length; i++) {
				if (files[i].isDirectory()) {
					tmpDir = _dest + File.separator + files[i].getName();
					System.out.println("mkdir:" + tmpDir);
					makeDir(tmpDir, true);
					xcopy(files[i].getAbsolutePath(), tmpDir);
				} else {
					tmpFile = _dest + File.separator + files[i].getName();
					System.out.println("copy file:"
							+ files[i].getAbsolutePath() + "->" + tmpFile);
					copyFile(files[i].getAbsolutePath(), tmpFile);
				}
			}

		} catch (Exception e) {
			System.out.println(e);
		}
	}

	public synchronized int getSize(String _path) throws FileNotFoundException {
		File dir = new File(formatPath(_path));
		if (!dir.exists()) {
			throw new FileNotFoundException();
		}
		if (!dir.isDirectory()) {
			size = (int) dir.length();
		} else {
			File[] fe = dir.listFiles();
			for (int i = 0; i < fe.length; i++) {
				if (fe[i].isDirectory()) {
					getSize(fe[i].toString());
				} else {
					size += fe[i].length();
				}
			}
		}
		return size;
	}

	public static boolean isDirEmpty(String _path) throws FileNotFoundException {
		File dir = new File(formatPath(_path));
		if (!dir.exists()) {
			throw new FileNotFoundException();
		}

		return (dir.listFiles().length == 0 ? true : false);
	}

	public static Collection listFiles(String directory, IOFileFilter fileFilter, IOFileFilter dirFilter) {

		return FileUtils.listFiles(new File(directory), fileFilter, dirFilter);
	}
	
	public static Long getFileSize(String _path) throws FileNotFoundException {
		Long filesize = null;

		File file = new File(formatPath(_path));
		if (!file.exists()) {
			throw new FileNotFoundException();
		}

		filesize = (long) file.length();

		return filesize;
	}
	
	public static boolean writeTemplateFile(String _sFileName, String _sFileContent,String charset) throws IOException {

		boolean bRet = false;
		FileOutputStream fos = null;
		OutputStreamWriter osw = null;
		BufferedWriter bw = null;
		try {
			fos = new FileOutputStream(FileBean.formatPath(_sFileName));
			osw = new OutputStreamWriter(fos, charset);
			bw = new BufferedWriter(osw);
			bw.write(_sFileContent);
			bw.flush();
			osw.flush();
			fos.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				bw.close();
				osw.close();
				fos.close();
			} catch (IOException e) {
				System.out.println("写文件错误:" + e);
				e.printStackTrace();
			}
		}
		return bRet;
	}

	public static void exec(String[] args) {
	}

	public String getEncode() {
		String p = System.getProperty("file.encoding");
		return p;
	}

	public static String formatPath(String _sPath) {
		String path = _sPath.replace('/', File.separatorChar);
		path = path.replace(File.separator + File.separator, File.separator);
		return path;
	}

	// ==============================================================
	// 测试

	public static void main(String[] args) {
		try {
			/*
			 * String aa = "教案示例2 \\华夏得普（北京）科技发展有限公司\\技术部\\物理\\高二\\人教版\\第十八章
			 * 电磁场和电磁波\\第二节
			 * 电磁振荡的周期和频率\\备课资料\\教案示例\\504B044E-74B6-0BA9-63E2-A07183609E6A\\main\\";
			 * aa = aa.substring(0, aa.lastIndexOf("\\main"));
			 * System.out.println(aa.substring(0, aa.lastIndexOf("\\")));
			 * 
			 * 
			 * System.out .println(FileBean .copyFile(
			 * "O:\\setup\\Sun.Software\\新建 文件夹\\j2re-1_4_2_04-windows-
			 * i586-p.exe", "O:\\setup\\Sun.Software\\aa.exe"));
			 */
			// int s = (new FileBean()).getSize("E:\\download");
			// System.out.println(s/1024);
			/*
			 * FileBean.deleteDir("d:\\tmp\\",true); FileBean wf = new
			 * FileBean(); String sFilePathName[] =
			 * {"d:\\FileBeanOut.txt","FileBeanOut.txt","d:\\test\\FileBeanOut","\\\\jeffsang\\share\\test.txt"};
			 * int i;
			 * 
			 * //测试有关文件、目录检查、创建、删除等操作 String sPath = "d:\\test2\\test21\\";
			 * String sSubPath = sPath + "test211\\"; boolean bRet;
			 * System.out.println(sPath + "=" + FileBean.fileExists(sPath));
			 * 
			 * bRet = FileBean.makeDir(sPath,true); System.out.println("Create
			 * dir["+sPath+"]=" +bRet); System.out.println(sPath + "=" +
			 * FileBean.fileExists(sPath));
			 * 
			 * bRet = FileBean.makeDir(sSubPath,true);
			 * System.out.println("Create dir["+sSubPath+"]=" +bRet);
			 * System.out.println(sSubPath+ "=" +
			 * FileBean.fileExists(sSubPath));
			 * 
			 * bRet = FileBean.deleteDir(sPath, true);
			 * System.out.println("Delete dir=" + bRet);
			 * System.out.println(sPath + FileBean.fileExists(sPath));
			 * 
			 * //测试有关文件名提取等函数 for(i=0; i<sFilePathName.length; i++){
			 * System.out.println("FilePathName=["+sFilePathName[i]+"]");
			 * System.out.println(" File
			 * found="+FileBean.fileExists(sFilePathName[i]));
			 * System.out.println(" FileName=[" +
			 * FileBean.getFileName(sFilePathName[i]) + "]");
			 * System.out.println(" FileExt=[" +
			 * FileBean.getFileExt(sFilePathName[i]) + "]");
			 * System.out.println(" FilePath=[" +
			 * FileBean.getFilePath(sFilePathName[i]) + "]");
			 * System.out.println(" FileAbsolutePathName=[" +
			 * FileBean.toAbsolutePathName(sFilePathName[i]) + "]");
			 * System.out.println(" FileDrive=[" +
			 * FileBean.getFileDrive(sFilePathName[i]) + "]"); }//end for
			 * 
			 * 
			 * //把strContent写入到文件strFilename中 String strContent = "This is a
			 * test file."; wf.writeFile("d:\\FileBeanOut.txt", strContent);
			 * //要打开文件，当前目录下必须有此文件， 例如：template.html
			 * System.out.println(wf.readFile("template.html"));
			 */
			// FileBean.chmod("\\xxtproject\\xxt\\catalog\\publish\\cms\\text.txt",
			// "777");
			// FileBean.chmod("/xxtproject/xxt/catalog/publish/temp/", "777");
			// FileBean.chown("/xxtproject/xxt/catalog/publish/temp/",
			// "kiosk:kiosk");
			// Linux
			// FileBean.xcopy("/xxtproject/xxt/catalog/publish/temp",
			// "/xxtproject/xxt/catalog/publish/temp2");
			// Windows
			// FileBean.xcopy("c:/test1", "c:/test2"); //or "c:\\test1"
			FileBean.copyFile("d:\\user.sql", "d:\\user01.sql");
		} catch (Exception e) {
			System.out.println("--------failed----" + e);
		} // end try
	}

}

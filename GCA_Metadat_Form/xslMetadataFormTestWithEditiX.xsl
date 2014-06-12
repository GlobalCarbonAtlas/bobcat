<?xml version="1.0" encoding="UTF-8"?>
<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Wed May 28 09:05:14 CEST 2014 -->

<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:gmd="http://www.isotc211.org/2005/gmd"
xmlns:gco="http://www.isotc211.org/2005/gco">
<xsl:output method="html"/>
	
	<xsl:template match="/">
		<!--<xsl:apply-templates select="//*/>--><!-- Difference avec <xsl:apply-templates/>??? -->
		<xsl:apply-templates/><!-- Apparement c'est la bonne methode : CF p 169 -> 172 livre Patrick-->
	</xsl:template>
	<!-- Apply template : CF http://www.w3schools.com/xsl/xsl_apply_templates.asp -->
	<!-- Template match : http://stackoverflow.com/questions/3127108/xsl-xsltemplate-match-->
	
	
<!--<xsl:template match="gmd:fileIdentifier">--><!-- Pas su faire (en essayant d'appliquer a xsl:value-of select="gco:CharacterString"/>-->
	
<xsl:template match="*"><!-- Si je remplace "*" par "/" ne m'applique rien : diff entre les 2 ?-->
	<html>
		<body>
			<!--<xsl:value-of select="gco:CharacterString"/>-->
			<xsl:for-each select="namespace::*">
				<xsl:value-of select="name()"/>
			
</xsl:for-each>
			

		
		</body>
	</html>
	</xsl:template>

</xsl:stylesheet>



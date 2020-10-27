<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"></xsl:output>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>ARQSITS Website</title>
            </head>
            <body>
                <table width="100%" border="1">
                    <tr>
                        <td width="30%" valign="top">
                            <h2>Indice</h2>
                            <xsl:apply-templates mode="indice" select="//ARQELEM">
                                <xsl:sort select="IDENTI"/>
                            </xsl:apply-templates>
                        </td>
                        <td>
                            <xsl:apply-templates select="//ARQELEM">
                                <xsl:sort select="IDENTI"/>
                            </xsl:apply-templates>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>
    
    <!-- INDICE -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="#{generate-id()}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    <!-- INDICE -->
    
    <xsl:template match="ARQELEM">
        <a name="{generate-id()}"/>
        <p><b>IDENTIFICAÇÃO</b> : <xsl:value-of select="IDENTI"/></p>
        <p><b>AUTOR</b> : <xsl:value-of select="AUTOR"/></p>
        <p><b>DATA</b> : <xsl:value-of select="DATA"/></p>
        <a href="#i{generate-id()}">
            <h3><b>VOLTAR AO INDICE</b></h3>
        </a>
        <hr width="100%" />
    </xsl:template>
    
</xsl:stylesheet>
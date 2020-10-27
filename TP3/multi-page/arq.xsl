<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="arqsite/index.html">
            <html>
                <head>
                    <title>ARQSITS Website</title>
                </head>
                <body>
                    <h2>Indice</h2>
                    <xsl:apply-templates mode="indice" select="//ARQELEM">
                        <xsl:sort select="IDENTI"/>
                    </xsl:apply-templates>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <!-- INDICE -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    <!-- INDICE -->
    
    <xsl:template match="ARQELEM">
        
        <xsl:result-document href="arqsite/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>IDENTIFICAÇÃO</b> : <xsl:value-of select="IDENTI"/></p>
                    <p><b>AUTOR</b> : <xsl:value-of select="AUTOR"/></p>
                    <p><b>DATA</b> : <xsl:value-of select="DATA"/></p>
                    <a href="index.html#i{generate-id()}">
                        <h3><b>VOLTAR AO INDICE</b></h3>
                    </a>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>
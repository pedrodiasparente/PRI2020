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
                    <div class="align">
                        <indice>INDICE</indice>
                    </div>
                    <hr/>
                    <xsl:apply-templates mode="indice" select="//ARQELEM">
                        <xsl:sort select="normalize-space(IDENTI)"/>
                    </xsl:apply-templates>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM">
            <xsl:sort select="normalize-space(IDENTI)"/>
        </xsl:apply-templates>
    </xsl:template>
    
    <!-- INDICE -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{position()}"/>
            <a href="http://localhost:7777/arqs/{position()}">
                <identi><xsl:value-of select="normalize-space(IDENTI)"/></identi>
            </a>
        </li>
    </xsl:template>
    
    
    <!-- ARQELEM -->
    
    <xsl:template match="ARQELEM">
        
        <xsl:result-document href="arqsite/arq{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>IDENTIFICAÇÃO</b> : <identi><xsl:value-of select="IDENTI"/></identi></p>
                    <p><b>AUTOR</b> : <autor><xsl:value-of select="AUTOR"/></autor></p>
                    <p><b>DATA</b> : <data><xsl:value-of select="DATA"/></data></p>
                    <p><b>DESCRIÇÃO</b> : <descricao><xsl:value-of select="DESARQ"/></descricao></p>
                    <a href="http://localhost:7777/arqs/*#i{position()}">
                        <div class="align">
                            <h3><b><indice>VOLTAR AO INDICE</indice></b></h3>
                        </div>
                    </a>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="multi-page/arqsite/index.html">
            <html>
                <head>
                    <title>ARQSITS Website</title>
                    <link rel="stylesheet" type="text/css" href="css/arq-index.css"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Architects+Daughter"/>
                </head>
                <body>
                    <div class="align">
                        <indice>Indice</indice>
                    </div>
                    <hr/>
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
                <identi><xsl:value-of select="IDENTI"/></identi>
            </a>
        </li>
    </xsl:template>
    
    
    <!-- INDICE -->
    
    <xsl:template match="ARQELEM">
        
        <xsl:result-document href="multi-page/arqsite/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <link rel="stylesheet" type="text/css" href="css/arq-node.css"/>
                </head>
                <body>
                    <p><b>IDENTIFICAÇÃO</b> : <identi><xsl:value-of select="IDENTI"/></identi></p>
                    <p><b>AUTOR</b> : <autor><xsl:value-of select="AUTOR"/></autor></p>
                    <p><b>DATA</b> : <data><xsl:value-of select="DATA"/></data></p>
                    <a href="index.html#i{generate-id()}">
                        <h3><b><indice>VOLTAR AO INDICE</indice></b></h3>
                    </a>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>